package com.community.backend.domain.post.repository;


import com.community.backend.domain.post.entity.Post;
import com.community.backend.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByOrderByCreatedDateDesc();
    List<Post> findByUser(User user);
    List<Post> findByUser_Username(String username);
}
