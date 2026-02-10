package com.community.backend.domain.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {

    @NotBlank(message = "Username must be written")
    @Size(min = 4, max = 20, message = "must be 4~20")
    private String username;

    @NotBlank(message = "Password must be written")
    @Size(min = 8, max = 20, message = "Required : 8~20")
    private String password;

    @NotBlank(message = "Email must be written")
    @Email(message = "Incorrect Email Format")
    private String email;

    @NotBlank(message = "Name must be written")
    private String nickname;
}
