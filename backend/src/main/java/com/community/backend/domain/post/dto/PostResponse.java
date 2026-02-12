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
    private String categoryName;
    private long viewCount;
    private long likeCount;
    private LocalDateTime createdDate;

    public PostResponse(Post post){
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.writer = post.getUser().getNickname();
        this.viewCount = post.getViewCount();
        this.createdDate = post.getCreatedDate();

        if (post.getCategory() != null) {
            this.categoryName = post.getCategory().getName();
        } else {
            this.categoryName = "Unsorted"; // 카테고리가 없는 기존 글들을 위해
        }
    }

    public void setLikeCount(long likeCount) {
        this.likeCount = likeCount;
    }
}
