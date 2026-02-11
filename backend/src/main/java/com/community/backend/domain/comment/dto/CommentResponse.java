package com.community.backend.domain.comment.dto;


import com.community.backend.domain.comment.entity.Comment;
import lombok.Getter;

import java.time.format.DateTimeFormatter;

@Getter
public class CommentResponse {
    private Long id;
    private String content;
    private String writer;
    private String createdDate;
    private Long postId;

    public CommentResponse(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.writer = comment.getUser().getUsername();
        this.postId = comment.getPost().getId();

        this.createdDate = comment.getCreatedDate().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
    }
}
