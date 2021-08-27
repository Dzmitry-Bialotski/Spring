package by.belotskiy.keepintouch.controller.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentDto {

    private int id;

    private String content;

    private String author;

    private String publishedAt;

}
