package com.community.backend.domain.post.controller;

import com.community.backend.domain.post.dto.PostRequest;
import com.community.backend.domain.post.dto.PostResponse;
import com.community.backend.domain.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping
    public ResponseEntity<Long> createPost(@RequestBody PostRequest request) {
        return ResponseEntity.ok(postService.createPost(request));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<Page<PostResponse>> getAllPosts(@PageableDefault(size = 10, sort = "createdDate", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(postService.getAllPosts(pageable));
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable Long postId) {
        return ResponseEntity.ok(postService.getPost(postId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostResponse>> getPostsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(postService.getPostsByUserId(userId));
    }
    @PutMapping("/{postId}")
    public ResponseEntity<Long> updatePost(
            @PathVariable Long postId,
            @RequestBody PostRequest request) {

        return ResponseEntity.ok(postService.updatePost(postId, request));
    }
    @GetMapping("/my")
    public ResponseEntity<List<PostResponse>> getMyPosts(Authentication authentication) {
        String currentUsername = authentication.getName();

        List<PostResponse> myPosts = postService.getMyPosts(currentUsername);
        return ResponseEntity.ok(myPosts);
    }
}
