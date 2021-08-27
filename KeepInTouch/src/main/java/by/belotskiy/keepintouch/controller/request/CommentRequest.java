package by.belotskiy.keepintouch.controller.request;

import by.belotskiy.keepintouch.model.Comment;
import lombok.Data;

@Data
public class CommentRequest {
    private Comment comment;
    private int newsId;
}
