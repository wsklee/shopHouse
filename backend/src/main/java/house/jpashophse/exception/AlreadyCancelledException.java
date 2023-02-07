package house.jpashophse.exception;

public class AlreadyCancelledException extends RuntimeException{
    public AlreadyCancelledException() {
    }

    public AlreadyCancelledException(String message) {
        super(message);
    }

    public AlreadyCancelledException(String message, Throwable cause) {
        super(message, cause);
    }

    public AlreadyCancelledException(Throwable cause) {
        super(cause);
    }
}