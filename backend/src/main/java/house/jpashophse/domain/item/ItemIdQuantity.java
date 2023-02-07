package house.jpashophse.domain.item;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
public class ItemIdQuantity {

    @NotNull
    @Positive
    private Long itemId;

    @NotNull
    @Positive
    private int itemCount;
}
