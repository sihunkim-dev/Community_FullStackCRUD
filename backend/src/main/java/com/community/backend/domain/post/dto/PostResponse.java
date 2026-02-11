package com.community.backend.domain.post.dto;

import com.community.backend.domain.post.entity.Post;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PostResponse {
    private Long id;
    private String title;
    private String content;
    private String writer;
    private LocalDateTime createdDate;

    public PostResponse(Post post){
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.writer = post.getUser().getNickname();
        this.createdDate = post.getCreatedDate();
    }
}
