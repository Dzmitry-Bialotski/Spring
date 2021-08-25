package by.belotskiy.keepintouch.service;

import by.belotskiy.keepintouch.exception.NoSuchNewsException;
import by.belotskiy.keepintouch.model.News;
import by.belotskiy.keepintouch.repostiory.NewsRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
public class NewsService {

    private final NewsRepository newsRepository;

    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    public News findById(int id){
        Optional<News> optionalNews = newsRepository.findById(id);
        if (optionalNews.isPresent()) {
            return optionalNews.get();
        } else {
            throw new NoSuchNewsException("There is no news with ID = " + id);
        }
    }

    public Page<News> findAll(Pageable pageable){
        return newsRepository.findAll(pageable);
    }

    public Page<News> findAllByTitle(String title, Pageable pageable){
        Page<News> news;
        if(title != null && !title.isEmpty()){
            news = newsRepository.findAllByTitle(title, pageable);
        } else {
            news = findAll(pageable);
        }
        return news;
    }

    public Page<News> findAllByAuthorId(String authorId, Pageable pageable){
        int id = Integer.parseInt(authorId);
        return newsRepository.findAllByAuthorId(id, pageable);
    }

    public News save(News news){
        news.setPublishedAt(Instant.now());
        return newsRepository.save(news);
    }

    public News update(News news){
        boolean isExists = findById(news.getId()) != null;
        if(isExists){
            news.setPublishedAt(Instant.now());
            return newsRepository.save(news);
        }
        else {
            throw new NoSuchNewsException("There is no news with ID = " + news.getId());
        }
    }

    public void delete(int id){
        if (findById(id) != null) {
            newsRepository.deleteById(id);
        } else {
            throw new NoSuchNewsException("There is no news with ID = " + id);
        }
    }
}
