package by.belotskiy.keepintouch.service;

import by.belotskiy.keepintouch.exception.NoSuchNewsException;
import by.belotskiy.keepintouch.model.Comment;
import by.belotskiy.keepintouch.model.News;
import by.belotskiy.keepintouch.model.User;
import by.belotskiy.keepintouch.repostiory.CommentRepository;
import by.belotskiy.keepintouch.repostiory.NewsRepository;
import by.belotskiy.keepintouch.repostiory.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;


@Service
public class CommentService {

    private final CommentRepository commentRepository;

    private final UserRepository userRepository;

    private final NewsRepository newsRepository;

    public CommentService(CommentRepository commentRepository, UserRepository userRepository, NewsRepository newsRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.newsRepository = newsRepository;
    }

    public Page<Comment> findAll(Pageable pageable){
        return commentRepository.findAll(pageable);
    }

    public Page<Comment> findAllByNewsId(int newId, Pageable pageable){
        return commentRepository.findAllByNews_Id(newId, pageable);
    }

    public Comment findById(int id){
        Optional<Comment> optionalComment = commentRepository.findById(id);
        if (optionalComment.isPresent()) {
            return optionalComment.get();
        } else {
            throw new NoSuchNewsException("There is no Comment with ID = " + id);
        }
    }

    public Comment save(Comment comment, int newsId, int userId){
        User user = userRepository.getById(userId);
        News news = newsRepository.getById(newsId);
        comment.setNews(news);
        comment.setAuthor(user);
        comment.setPublishedAt(Instant.now());
        return commentRepository.save(comment);
    }

    public Comment update(Comment comment, String login){
        Comment prevComment = commentRepository.findById(comment.getId()).get();
        if(prevComment.getAuthor().getLogin().equals(login)){
            comment.setPublishedAt(Instant.now());
            return commentRepository.save(comment);
        }
        else {
            throw new NoSuchNewsException("UPDATE FAILED = " + comment.getId());
        }
    }

    public void delete(int id, String login){
        Optional<Comment> optionalComment =  commentRepository.findById(id);
        if (optionalComment.isPresent()) {
            Comment comment = optionalComment.get();
            if (comment.getAuthor().getLogin().equals(login)) {
                commentRepository.deleteById(id);
                return;
            }
        }
        throw new NoSuchNewsException("DELETE FAILED = " + id);
    }
}
