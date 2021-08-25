package by.belotskiy.keepintouch.repostiory;

import by.belotskiy.keepintouch.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    Page<Comment> findCommentsByNews_IdOrderByDateAsc(Integer news_id, Pageable pageable);
}
