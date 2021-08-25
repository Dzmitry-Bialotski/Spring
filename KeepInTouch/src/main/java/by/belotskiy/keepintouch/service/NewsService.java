package by.belotskiy.keepintouch.service;

import by.belotskiy.keepintouch.model.News;
import by.belotskiy.keepintouch.repostiory.NewsRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NewsService {

    private final NewsRepository newsRepository;

    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    public Optional<News> findNewsById(Integer id) {
        return newsRepository.findById(id);
    }

    public Page<News> findNewsByTitle(String title, Pageable pageable){
        return newsRepository.findNewsByTitleContainingOrderByDateAsc(title, pageable);
    }

    public News saveNews(News news) {
        return newsRepository.save(news);
    }

    public void deleteNewsById(Integer id) {
        newsRepository.deleteById(id);
    }

    public Page<News> findAllNews(Pageable pageable) {
        return newsRepository.findAll(pageable);
    }
}
