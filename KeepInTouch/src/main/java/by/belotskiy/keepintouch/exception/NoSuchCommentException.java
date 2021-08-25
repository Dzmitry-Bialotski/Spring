package by.belotskiy.keepintouch.exception;

public class NoSuchCommentException extends RuntimeException {

    public NoSuchCommentException(String message) {
        super(message);
    }

    public NoSuchCommentException(String message, Throwable cause) {
        super(message, cause);
    }
}
