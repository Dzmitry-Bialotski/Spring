package by.belotskiy.keepintouch.service;

import by.belotskiy.keepintouch.model.Comment;
import by.belotskiy.keepintouch.model.News;
import by.belotskiy.keepintouch.repostiory.CommentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Optional<Comment> findComment(Integer id) {
        return commentRepository.findById(id);
    }

    public Page<Comment> findCommentsByNews(News news, Pageable pageable){
        //return commentRepository.findCommentsByNews_IdOrderByDateAsc(news.getId(), pageable);
        return null;
    }

    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public void deleteCommentById(Integer id) {
        commentRepository.deleteById(id);
    }
}
