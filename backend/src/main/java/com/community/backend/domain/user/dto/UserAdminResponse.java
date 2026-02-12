package com.community.backend.domain.user.dto;

import com.community.backend.domain.user.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UserAdminResponse {
    private Long id;
    private String username;
    private String nickname;
    private Role role;
    private String email;
    private int postCount;
}
