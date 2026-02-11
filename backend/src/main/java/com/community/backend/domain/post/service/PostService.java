package com.community.backend.domain.post.service;

import com.community.backend.domain.category.Repository.CategoryRepository;
import com.community.backend.domain.category.entity.Category;
import com.community.backend.domain.post.dto.PostRequest;
import com.community.backend.domain.post.dto.PostResponse;
import com.community.backend.domain.post.entity.Post;
import com.community.backend.domain.post.repository.PostRepository;
import com.community.backend.domain.user.entity.Role;
import com.community.backend.domain.user.entity.User;
import com.community.backend.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    @Transactional
    public Long createPost(PostRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByUsername(username).orElseThrow(()-> new NoSuchElementException("User not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("No exist catogory. id=" + request.getCategoryId()));

        Post post = Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .user(user)
                .category(category)
                .build();

        return postRepository.save(post).getId();
    }

    @Transactional
    public void deletePost(Long postId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post not found"));

        if (user.getRole() != Role.ADMIN && !post.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("You do not have permission to delete this post");
        }

        postRepository.delete(post);
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getAllPosts(){
        return postRepository.findAll().stream()
                .map(PostResponse::new)
                .sorted((p1,p2)->p2.getCreatedDate().compareTo(p1.getCreatedDate()))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PostResponse getPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post not found"));

        return new PostResponse(post);
    }

    @Transactional
    public Long updatePost(Long postId, PostRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new NoSuchElementException("Post not found"));

        if (!post.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("You do not have permission to update this post");
        }

        // Dirty Checking으로 인해 Transaction이 끝날 때 Update 쿼리가 날아갑니다.
        post.update(request.getTitle(), request.getContent());
        return postId;
    }
}
