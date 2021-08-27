package by.belotskiy.keepintouch.controller.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NewsDto {

    private int id;

    private String sourceName;

    private String author;

    private String title;

    private String description;

    private String url;

    private String urlToImage;

    private String publishedAt;

    private String content;

    private int likesCount;

    private boolean liked;
}
