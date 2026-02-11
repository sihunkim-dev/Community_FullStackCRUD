package com.community.backend.domain.comment.repository;

import com.community.backend.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPostIdOrderByCreatedDateAsc(Long postId);

    List<Comment> findByUserId(Long userId);
}
