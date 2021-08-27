package by.belotskiy.keepintouch.service;

import by.belotskiy.keepintouch.controller.PageResponse;
import by.belotskiy.keepintouch.controller.dto.NewsDto;
import by.belotskiy.keepintouch.controller.dto.mapper.DtoMapper;
import by.belotskiy.keepintouch.exception.NoSuchNewsException;
import by.belotskiy.keepintouch.model.News;
import by.belotskiy.keepintouch.model.User;
import by.belotskiy.keepintouch.model.embeddable.LikeId;
import by.belotskiy.keepintouch.repostiory.LikeRepository;
import by.belotskiy.keepintouch.repostiory.NewsRepository;
import by.belotskiy.keepintouch.repostiory.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NewsService {

    private final NewsRepository newsRepository;
    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final DtoMapper dtoMapper;

    public NewsService(NewsRepository newsRepository, LikeRepository likeRepository,
                       UserRepository userRepository, DtoMapper dtoMapper) {
        this.newsRepository = newsRepository;
        this.likeRepository = likeRepository;
        this.userRepository = userRepository;
        this.dtoMapper = dtoMapper;
    }

    public NewsDto findById(int newsId, int userId){
        News news = newsRepository.findById(newsId).get();
        int likesCount = likeRepository.countByNews_Id(newsId);
        boolean isLiked = likeRepository.findById(new LikeId(userId, newsId)).isPresent();
        NewsDto newsDto = dtoMapper.mapToDto(news);
        newsDto.setLiked(isLiked);
        newsDto.setLikesCount(likesCount);
        return newsDto;
    }

    public NewsDto findWithLikesById(int id){
        Optional<NewsDto> optionalNewsDto = newsRepository.findNewsWithLikesById(id);
        if (optionalNewsDto.isPresent()) {
            return optionalNewsDto.get();
        } else {
            throw new NoSuchNewsException("There is no news with ID = " + id);
        }
    }

    public PageResponse<NewsDto> findAllByTitle(String title, Pageable pageable, int userId){
        Page<News> news;
        if(title != null && !title.isEmpty()){
            news = newsRepository.findAllByTitleContaining(title, pageable);
        } else {
            news = newsRepository.findAll(pageable);
        }
        return getNewsDtoPageResponse(userId, news);
    }

    public PageResponse<NewsDto> findAllByAuthorId(int authorId, Pageable pageable, int userId){
        Page<News> newsPage = newsRepository.findAllByAuthorId(authorId, pageable);
        return getNewsDtoPageResponse(userId, newsPage);
    }

    private PageResponse<NewsDto> getNewsDtoPageResponse(int userId, Page<News> newsPage) {
        List<NewsDto> newsDtoList = dtoMapper.mapNewsPageToList(newsPage);
        newsDtoList = newsDtoList.stream().map(newsDto -> {
            newsDto.setLikesCount(likeRepository.countByNews_Id(newsDto.getId()));
            newsDto.setLiked(likeRepository.findById(new LikeId(userId, newsDto.getId())).isPresent());
            return newsDto;
        }).collect(Collectors.toList());
        return new PageResponse<>(newsDtoList, newsPage.getSize(), newsPage.getNumber());
    }

    public News save(News news, String login){
        User user = userRepository.findUserByLogin(login);
        news.setPublishedAt(Instant.now());
        news.setAuthor(user);
        return newsRepository.save(news);
    }

    public News update(News news, String login){
        News prevNews = newsRepository.findById(news.getId()).get();
        if(prevNews.getAuthor().getLogin().equals(login)){
            news.setPublishedAt(Instant.now());
            return newsRepository.save(news);
        }
        else {
            throw new NoSuchNewsException("UPDATE FAILED = " + news.getId());
        }
    }

    public void delete(int id, String login){
        Optional<News> optionalNews =  newsRepository.findById(id);
        if (optionalNews.isPresent()) {
            News news = optionalNews.get();
            if (news.getAuthor().getLogin().equals(login)) {
                newsRepository.deleteById(id);
                return;
            }
        }
        throw new NoSuchNewsException("There is no news with ID = " + id);
    }
}
