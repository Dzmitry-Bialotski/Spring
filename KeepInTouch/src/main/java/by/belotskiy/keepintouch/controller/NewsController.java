package by.belotskiy.keepintouch.controller;

import by.belotskiy.keepintouch.config.CustomUserDetails;
import by.belotskiy.keepintouch.controller.dto.NewsDto;
import by.belotskiy.keepintouch.controller.dto.mapper.DtoMapper;
import by.belotskiy.keepintouch.model.News;
import by.belotskiy.keepintouch.service.FileService;
import by.belotskiy.keepintouch.service.NewsService;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/news")
public class NewsController {

    private final NewsService newsService;
    private final FileService fileService;
    private final DtoMapper dtoMapper;

    public NewsController(NewsService newsService, FileService fileService, DtoMapper dtoMapper) {
        this.newsService = newsService;
        this.fileService = fileService;
        this.dtoMapper = dtoMapper;
    }

    @GetMapping
    public PageResponse<NewsDto> getAllNewsPage(
            @RequestParam(required = false, defaultValue = "") String title,
            @PageableDefault(
                    sort={"publishedAt"},
                    direction = Sort.Direction.ASC
            ) Pageable pageable,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        return newsService.findAllByTitle(title, pageable, userDetails.getId());

    }

    @GetMapping("/author/{authorId}")
    public PageResponse<NewsDto> getAllNewsPageByAuthorId(
            @PageableDefault(
                    sort = {"publishedAt"},
                    direction = Sort.Direction.ASC
            ) Pageable pageable,
            @PathVariable Integer authorId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        return newsService.findAllByAuthorId(authorId, pageable, userDetails.getId());
    }

    @GetMapping("/{newsId}")
    public NewsDto getNewsById(@PathVariable Integer newsId,
                               @AuthenticationPrincipal CustomUserDetails userDetails) {
        return newsService.findById(newsId, userDetails.getId());
    }

    @PostMapping
    public NewsDto addNews(@RequestBody News news,
                           @AuthenticationPrincipal CustomUserDetails userDetails,
                           @RequestParam("file") MultipartFile file
                           ) {
        news = fileService.saveNewsPhoto(file, news);
        news = newsService.save(news, userDetails.getUsername());
        return dtoMapper.mapToDto(news);
    }

    @PutMapping
    public NewsDto updateNews(@RequestBody News news,
                              @AuthenticationPrincipal CustomUserDetails userDetails) {
        news = newsService.update(news, userDetails.getUsername());
        return dtoMapper.mapToDto(news);
    }

    @DeleteMapping("/{newsId}")
    public ResponseEntity<?> deleteNews(@PathVariable Integer newsId,
                                        @AuthenticationPrincipal CustomUserDetails userDetails) {
        newsService.delete(newsId, userDetails.getUsername());
        return new ResponseEntity<>("News with ID " + newsId + " was successfully deleted",
                HttpStatus.OK) ;
    }
}