package by.belotskiy.keepintouch.exception.handler;

import by.belotskiy.keepintouch.exception.NoSuchCommentException;
import by.belotskiy.keepintouch.exception.NoSuchNewsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.persistence.EntityNotFoundException;
import java.time.ZonedDateTime;

@ControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(value = {
            NoSuchCommentException.class,
            NoSuchNewsException.class,
            EntityNotFoundException.class,
            IllegalArgumentException.class})
    public ResponseEntity<ApiException> handleNoContentException(RuntimeException e){
        HttpStatus badRequest = HttpStatus.BAD_REQUEST;

        ApiException apiException = new ApiException(
                e.getMessage(),
                e,
                badRequest,
                ZonedDateTime.now()
        );
        return new ResponseEntity<>(apiException, badRequest);
    }
}
