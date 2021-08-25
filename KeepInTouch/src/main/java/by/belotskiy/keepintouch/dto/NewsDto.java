package by.belotskiy.keepintouch.dto;

import lombok.Data;

@Data
public class NewsDto {

    private String sourceName;

    private String author;

    private String title;

    private String description;

    private String url;

    private String urlToImage;

    private String publishedAt;

    private String content;

}
