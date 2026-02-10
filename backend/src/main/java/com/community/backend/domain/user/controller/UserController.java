package com.community.backend.domain.user.controller;

import com.community.backend.domain.user.dto.FindUsernameRequest;
import com.community.backend.domain.user.dto.LoginRequest;
import com.community.backend.domain.user.dto.SignupRequest;
import com.community.backend.domain.user.service.UserService;
import com.community.backend.global.jwt.TokenInfo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Valid @RequestBody SignupRequest request) {
        userService.signup(request);

        return ResponseEntity.status(HttpStatus.CREATED).body("Signup Successful");
    }

    @PostMapping("/find-username")
    public ResponseEntity<String> findUsername(@RequestBody FindUsernameRequest request) {
        String username = userService.findUsername(request);
        return ResponseEntity.ok(username);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenInfo> login(@RequestBody LoginRequest request) {
        TokenInfo tokenInfo =userService.login(request);
        return ResponseEntity.ok(tokenInfo);
    }
}
