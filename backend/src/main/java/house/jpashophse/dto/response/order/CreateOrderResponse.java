package house.jpashophse.dto.response.order;

import lombok.Data;

@Data
public class CreateOrderResponse {

    private Long orderId;

    public CreateOrderResponse(Long orderId){
        this.orderId = orderId;
    }
}
