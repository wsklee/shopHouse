package house.jpashophse.dto.request.order;

import house.jpashophse.domain.item.ItemIdQuantity;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

@Data
public class CreateOrderRequest {

    @NotEmpty
    private List<ItemIdQuantity> itemIdQuantityList;
}


