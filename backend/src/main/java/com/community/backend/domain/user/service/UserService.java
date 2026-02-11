package com.community.backend.domain.user.service;

import com.community.backend.domain.user.dto.FindUsernameRequest;
import com.community.backend.domain.user.dto.LoginRequest;
import com.community.backend.domain.user.dto.SignupRequest;
import com.community.backend.domain.user.dto.UserAdminResponse;
import com.community.backend.domain.user.entity.Role;
import com.community.backend.domain.user.entity.User;
import com.community.backend.domain.user.repository.UserRepository;
import com.community.backend.global.jwt.JwtTokenProvider;
import com.community.backend.global.jwt.TokenInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public void signup(SignupRequest request) {
        if(userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Already exists username");
        }

        if(userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Already exists email");
        }

        if(userRepository.existsByNickname(request.getNickname())) {
            throw new IllegalArgumentException("Already exists nickname");
        }

        String encodedPassword = passwordEncoder.encode(request.getPassword());

        User user = User.builder()
                .username(request.getUsername())
                .password(encodedPassword)
                .email(request.getEmail())
                .nickname(request.getNickname())
                .role(Role.USER)
                .build();

        userRepository.save(user); //save() <- JPArepository
    }

    public String findUsername(FindUsernameRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(()->new IllegalArgumentException("User not found"));
        return user.getUsername();
    }

    public TokenInfo login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(()->new IllegalArgumentException("User not found"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Wrong password");
        }

        String accessToken = jwtTokenProvider.createAccessToken(user.getUsername(), user.getRole().name());
        String refreshToken = jwtTokenProvider.createRefreshToken(user.getUsername());

        return TokenInfo.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Transactional(readOnly = true)
    public List<UserAdminResponse> getAllUsersForAdmin(){
        return userRepository.findAll().stream()
                .map(user -> UserAdminResponse.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .nickname(user.getNickname())
                        .role(user.getRole())
                        .postCount(user.getPosts().size())
                        .build())
                .collect(Collectors.toList());
    }
}


