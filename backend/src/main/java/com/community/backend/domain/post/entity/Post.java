package com.community.backend.domain.post.entity;

import com.community.backend.domain.category.entity.Category;
import com.community.backend.domain.user.entity.User;
import com.community.backend.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@NoArgsConstructor
public class Post extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "view_count", columnDefinition = "bigint default 0")
    private Long viewCount = 0L;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    public void increaseViewCount() {
        this.viewCount++;
    }

    @Builder
    public Post(String title, String content, User user, Category category) {
        this.title = title;
        this.content = content;
        this.user = user;
        this.viewCount = 0L;
        this.category = category;
    }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
    }

}
