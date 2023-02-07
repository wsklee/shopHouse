package house.jpashophse.exception;


public class UnauthorizedMemberException extends RuntimeException{
    public UnauthorizedMemberException() {
    }

    public UnauthorizedMemberException(String message) {
        super(message);
    }

    public UnauthorizedMemberException(String message, Throwable cause) {
        super(message, cause);
    }

    public UnauthorizedMemberException(Throwable cause) {
        super(cause);
    }
}
