package com.community.backend.domain.comment.controller;

import com.community.backend.domain.comment.dto.CommentRequest;
import com.community.backend.domain.comment.dto.CommentResponse;
import com.community.backend.domain.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<Long> createComment(@RequestBody CommentRequest request, Authentication authentication) {
        return ResponseEntity.ok(commentService.createComment(request, authentication.getName()));
    }
    @GetMapping("/{postId}")
    public ResponseEntity<List<CommentResponse>> getComments(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getComments(postId));
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId, Authentication authentication) {
        commentService.deleteComment(commentId, authentication.getName());
        return ResponseEntity.ok().build();
    }
    @PutMapping("/{commentId}")
    public ResponseEntity<Void> updateComment(@PathVariable Long commentId,
                                              @RequestBody CommentRequest request,
                                              Authentication authentication) {
        commentService.updateComment(commentId, request.getContent(), authentication.getName());
        return ResponseEntity.ok().build();
    }
}
