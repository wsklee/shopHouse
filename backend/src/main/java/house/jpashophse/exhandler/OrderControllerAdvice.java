package house.jpashophse.exhandler;

import house.jpashophse.controller.OrderController;
import house.jpashophse.exception.AlreadyCancelledException;
import house.jpashophse.exception.NotEnoughStockException;
import house.jpashophse.exception.UnauthorizedMemberException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(assignableTypes = {OrderController.class})
@Order(Ordered.HIGHEST_PRECEDENCE)
@Slf4j
public class OrderControllerAdvice {


    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler
    private ErrorResult notEnoughStockHandle(NotEnoughStockException e){
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("STOCK", "Item stock not enough");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler
    private ErrorResult alreadyCancelledHandle(AlreadyCancelledException e){
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("CANCEL", "Order is cancelled already");
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler
    private ErrorResult unauthorizedMemberHandle(UnauthorizedMemberException e){
        log.error("[exceptionHandle] ex", e);
        return new ErrorResult("UNAUTH", "Unauthorized Member");
    }


}
