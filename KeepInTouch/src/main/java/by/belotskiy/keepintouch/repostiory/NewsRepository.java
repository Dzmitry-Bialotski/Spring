package by.belotskiy.keepintouch.repostiory;

import by.belotskiy.keepintouch.model.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends JpaRepository<News, Integer>, NewsDtoRepository {

    Page<News> findAllByAuthorId(int authorId, Pageable pageable);

    Page<News> findAllByTitleContaining(String title, Pageable pageable);
}
