package com.community.backend.domain.user.service;

import com.community.backend.domain.user.entity.User;
import com.community.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        // 권한 이름을 가져옵니다 (예: "USER" 또는 "ROLE_USER")
        String roleName = user.getRole().name();

        // 만약 DB에 "USER"라고 저장되어 있다면 "ROLE_USER"로 수동으로 맞춰주는 것이 가장 안전합니다.
        String grantedRole = roleName.startsWith("ROLE_") ? roleName : "ROLE_" + roleName;

        System.out.println("로그인 시도 유저 권한 확인: " + grantedRole); // 👈 디버깅용 로그

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword()) // 이미 암호화된 상태여야 함
                .authorities(grantedRole) // .roles() 대신 .authorities() 사용
                .build();
    }
}
