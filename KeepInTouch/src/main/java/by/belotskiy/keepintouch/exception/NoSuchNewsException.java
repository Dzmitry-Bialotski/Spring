package by.belotskiy.keepintouch.exception;

public class NoSuchNewsException extends RuntimeException {

    public NoSuchNewsException(String message) {
        super(message);
    }

    public NoSuchNewsException(String message, Throwable cause) {
        super(message, cause);
    }
}