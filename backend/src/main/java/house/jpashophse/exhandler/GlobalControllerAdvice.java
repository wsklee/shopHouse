package house.jpashophse.exhandler;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import house.jpashophse.exception.DuplicateMemberException;
import house.jpashophse.exception.NotEnoughStockException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestCookieException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@Order(Ordered.LOWEST_PRECEDENCE)
@Slf4j
public class GlobalControllerAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler
    private ErrorResult illegalExHandle(IllegalArgumentException e){
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("BAD", e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler
    private ErrorResult missingRequestCookieHandle(MissingRequestCookieException e){
        log.error("Missing Cookie Error", e);
        return new ErrorResult("MISSINGCOOKIE", e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler
    private ErrorResult duplicateMemberHandle(DuplicateMemberException e){
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("DUPMEMBER", e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler
    private ErrorResult nullPointerHandle(NullPointerException e){
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("NULLPOINTER", "Requested resource is not found");
    }



    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(HttpMessageNotReadableException.class)
    private ErrorResult invalidFormatHandle(HttpMessageNotReadableException e){
        log.error("[exceptionHandle] ex", e);
        if(e.getRootCause() instanceof InvalidFormatException){
            return new ErrorResult("INVALIDJSONFORMAT", "Input Format is invalid");
        } else {
            return new ErrorResult("INVALIDFORMAT", e.getMessage());
        }
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler
    private ErrorResult methodArgumentNotValidHandle(MethodArgumentNotValidException e){
        log.error("[exceptionHandle] ex", e);
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors()
                .forEach(c -> errors.put(((FieldError) c).getField(), c.getDefaultMessage()));
        return new ErrorResult("INVALID", errors);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler
    private ErrorResult exHandle(Exception e) {
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("EX", "Internal Error");
    }
}
