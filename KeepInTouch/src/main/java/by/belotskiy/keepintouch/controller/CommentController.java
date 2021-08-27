package by.belotskiy.keepintouch.controller;

import by.belotskiy.keepintouch.config.CustomUserDetails;
import by.belotskiy.keepintouch.controller.request.CommentRequest;
import by.belotskiy.keepintouch.controller.dto.CommentDto;
import by.belotskiy.keepintouch.controller.dto.mapper.DtoMapper;
import by.belotskiy.keepintouch.model.Comment;
import by.belotskiy.keepintouch.service.CommentService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/comments")
public class CommentController {

    private final CommentService commentService;
    private final DtoMapper dtoMapper;

    public CommentController(CommentService commentService, DtoMapper dtoMapper) {
        this.commentService = commentService;
        this.dtoMapper = dtoMapper;
    }

    @GetMapping
    public PageResponse<CommentDto> getAllComments(
            @PageableDefault(
                    sort = {"publishedAt"},
                    direction = Sort.Direction.ASC
            ) Pageable pageable) {
        Page<Comment> commentPage = commentService.findAll(pageable);
        List<CommentDto> commentDtoList = dtoMapper.mapCommentPageToList(commentPage);
        return new PageResponse<>(commentDtoList, commentPage.getSize(), commentPage.getNumber());
    }

    @GetMapping("/news/{newsId}")
    public PageResponse<CommentDto> getAllCommentsByNewsId(
            @PageableDefault(
                    sort = {"publishedAt"},
                    direction = Sort.Direction.ASC
            ) Pageable pageable,
            @PathVariable Integer newsId) {
        Page<Comment> commentPage = commentService.findAllByNewsId(newsId, pageable);
        List<CommentDto> commentDtoList = dtoMapper.mapCommentPageToList(commentPage);
        return new PageResponse<>(commentDtoList, commentPage.getSize(), commentPage.getNumber());
    }

    @GetMapping("/{commentId}")
    public CommentDto getCommentById(@PathVariable Integer commentId) {
        Comment comment = commentService.findById(commentId);
        return dtoMapper.mapToDto(comment);
    }

    @PostMapping
    public CommentDto addComment(@RequestBody CommentRequest commentRequest,
                                 @AuthenticationPrincipal CustomUserDetails userDetails) {
        Comment comment = commentService.save(commentRequest.getComment(), commentRequest.getNewsId(), userDetails.getId());
        return dtoMapper.mapToDto(comment);
    }

    @PutMapping
    public CommentDto updateComment(@RequestBody Comment comment,
                                    @AuthenticationPrincipal CustomUserDetails userDetails) {
        comment = commentService.update(comment, userDetails.getUsername());
        return dtoMapper.mapToDto(comment);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Integer commentId,
                                           @AuthenticationPrincipal CustomUserDetails userDetails) {
        commentService.delete(commentId, userDetails.getUsername());
        return new ResponseEntity<>("Comment with ID " + commentId + " was successfully deleted",
                HttpStatus.OK) ;
    }
}
