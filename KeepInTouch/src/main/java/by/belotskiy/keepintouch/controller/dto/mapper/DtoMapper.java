package by.belotskiy.keepintouch.controller.dto.mapper;

import by.belotskiy.keepintouch.controller.dto.CommentDto;
import by.belotskiy.keepintouch.controller.dto.NewsDto;
import by.belotskiy.keepintouch.model.Comment;
import by.belotskiy.keepintouch.model.News;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DtoMapper {

    public DtoMapper() { }

    public NewsDto mapToDto(News news){
        return NewsDto
                .builder()
                .id(news.getId())
                .sourceName(news.getSourceName())
                .author(news.getAuthor() != null ? news.getAuthor().getLogin() : null)
                .title(news.getTitle())
                .description(news.getDescription())
                .url(news.getUrl())
                .urlToImage(news.getUrlToImage())
                .publishedAt(news.getPublishedAt().toString())
                .content(news.getContent())
                .build();
    }

    public CommentDto mapToDto(Comment comment){
        return CommentDto
                .builder()
                .id(comment.getId())
                .content(comment.getContent())
                .author(comment.getAuthor() != null ? comment.getAuthor().getLogin() : null)
                .publishedAt(comment.getPublishedAt().toString())
                .build();
    }

    public  List<NewsDto> mapNewsPageToList(Page<News> newsPage){
        return newsPage.getContent()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public  List<CommentDto> mapCommentPageToList(Page<Comment> commentPage){
        return commentPage.getContent()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
}
