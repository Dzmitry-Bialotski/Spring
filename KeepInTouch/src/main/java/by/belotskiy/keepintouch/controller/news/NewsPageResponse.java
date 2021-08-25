package by.belotskiy.keepintouch.controller.news;

import by.belotskiy.keepintouch.dto.NewsDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class NewsPageResponse {
    private final List<NewsDto> news;
    private final int size;
    private final int page;
}
