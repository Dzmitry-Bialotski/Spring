package by.belotskiy.keepintouch.dto;

import lombok.Data;

@Data
public class CommentDto {

    private String content;

    private String author;

    private String publishedAt;

}
