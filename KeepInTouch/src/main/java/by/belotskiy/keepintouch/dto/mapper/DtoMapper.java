package by.belotskiy.keepintouch.dto.mapper;

import by.belotskiy.keepintouch.dto.CommentDto;
import by.belotskiy.keepintouch.dto.NewsDto;
import by.belotskiy.keepintouch.model.Comment;
import by.belotskiy.keepintouch.model.News;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class DtoMapper extends ModelMapper{

    public DtoMapper() { }

    public NewsDto mapToDto(News news){
        NewsDto newsDto = super.map(news, NewsDto.class);
        if(news.getAuthor() != null){
            newsDto.setAuthor(news.getAuthor().getLogin());
        }
        newsDto.setPublishedAt(news.getPublishedAt().toString());
        return newsDto;
    }

    public CommentDto mapToDto(Comment comment){
        CommentDto commentDto = super.map(comment, CommentDto.class);
        if(comment.getAuthor() != null){
            commentDto.setAuthor(comment.getAuthor().getLogin());
        }
        commentDto.setPublishedAt(comment.getPublishedAt().toString());
        return commentDto;
    }

    public  List<NewsDto> mapPageToList(Page<News> newsPage){
        return newsPage.getContent()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
}
