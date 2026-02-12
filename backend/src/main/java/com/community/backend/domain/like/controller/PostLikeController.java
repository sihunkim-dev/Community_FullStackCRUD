package com.community.backend.domain.like.controller;

import com.community.backend.domain.like.service.PostLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostLikeController {
    private final PostLikeService postLikeService;

    @PostMapping("/{postId}/like")
    public ResponseEntity<Void> toggleLike(@PathVariable Long postId, Authentication authentication) {
        postLikeService.toggleLike(postId, authentication.getName());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{postId}/count")
    public ResponseEntity<Long> countLikes(@PathVariable Long postId) {
        return ResponseEntity.ok(postLikeService.countLikes(postId));
    }
}
