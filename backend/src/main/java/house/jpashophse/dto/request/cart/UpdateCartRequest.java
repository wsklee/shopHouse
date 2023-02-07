package house.jpashophse.dto.request.cart;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
public class UpdateCartRequest {
    @NotNull
    @Positive
    private int itemCount;
}
