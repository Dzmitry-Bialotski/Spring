package by.belotskiy.keepintouch.controller;

import by.belotskiy.keepintouch.dto.NewsDto;
import by.belotskiy.keepintouch.dto.mapper.DtoMapper;
import by.belotskiy.keepintouch.exception.NoSuchNewsException;
import by.belotskiy.keepintouch.model.News;
import by.belotskiy.keepintouch.service.NewsService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/")
public class NewsController {

    private final NewsService newsService;
    private final DtoMapper dtoMapper;

    public NewsController(NewsService newsService, DtoMapper dtoMapper) {
        this.newsService = newsService;
        this.dtoMapper = dtoMapper;
    }

    @GetMapping("/news")
    public ResponseEntity<Map<String, Object>> getAllNewsPage(
            @RequestParam(required = false, defaultValue = "") String title,
            @PageableDefault(
                    sort={"publishedAt"},
                    direction = Sort.Direction.ASC
            ) Pageable pageable) {
        Page<News> pageNews;
        if (title == null){
            pageNews = newsService.findAll(pageable);
        }else{
            pageNews = newsService.findAllByTitle(title, pageable);
        }

        List<NewsDto> newsDtos = pageNews.getContent().stream()
                .map(n -> dtoMapper.mapToDto(n))
                .collect(Collectors.toList());

        if (newsDtos.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("news", newsDtos);
        response.put("sort", pageNews.getSort());
        response.put("size", pageNews.getSize());
        response.put("page", pageNews.getNumber());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/news/{newsId}")
    public NewsDto showNews(@PathVariable Integer newsId) {
        News news = newsService.findById(newsId);
        return dtoMapper.mapToDto(news);
    }

    @PostMapping("/news")
    public NewsDto addNews(@RequestBody News news) {
        news = newsService.save(news);
        return dtoMapper.mapToDto(news);
    }

    @PutMapping("/news")
    public NewsDto updateNews(@RequestBody News news) {
        news = newsService.update(news);
        return dtoMapper.mapToDto(news);
    }

    @DeleteMapping("/news/{newsId}")
    public ResponseEntity<?> deleteNews(@PathVariable Integer newsId) {
        newsService.delete(newsId);
        return new ResponseEntity<>("News with ID " + newsId + " was successfully deleted",
                HttpStatus.OK) ;
    }
}
