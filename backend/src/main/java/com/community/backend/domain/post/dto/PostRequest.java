package com.community.backend.domain.post.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class PostRequest {

    @NotBlank(message = "Title is mandatory")
    @Size(max = 100, message = "Please Input under  100 words")
    private String title;

    @NotBlank(message = "Content is mandatory")
    private String content;

    @NotNull(message = "Category ID is mandatory")
    private Long categoryId;

    public PostRequest(String title, String content) {
        this.title = title;
        this.content = content;
    }
}
