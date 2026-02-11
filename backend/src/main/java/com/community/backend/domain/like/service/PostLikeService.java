package com.community.backend.domain.like.service;

import com.community.backend.domain.like.entity.PostLike;
import com.community.backend.domain.like.repository.PostLikeRepository;
import com.community.backend.domain.post.entity.Post;
import com.community.backend.domain.post.repository.PostRepository;
import com.community.backend.domain.user.entity.User;
import com.community.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PostLikeService {

    private final PostLikeRepository postLikeRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public void toggleLike(Long postId, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        postLikeRepository.findByUserAndPost(user, post)
                .ifPresentOrElse(
                        postLike -> postLikeRepository.delete(postLike),
                        () -> {
                            PostLike newLike = PostLike.builder()
                                    .user(user)
                                    .post(post)
                                    .build();
                            postLikeRepository.save(newLike);
                        }
                );
    }

    public long countLikes(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));
        return postLikeRepository.countByPost(post); // Repository에 메서드 추가 필요
    }
}