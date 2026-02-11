package com.community.backend.domain.like.repository;

import com.community.backend.domain.like.entity.PostLike;
import com.community.backend.domain.post.entity.Post;
import com.community.backend.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
    Optional<PostLike> findByUserAndPost(User user, Post post);

    long countByPost(Post post);
}
