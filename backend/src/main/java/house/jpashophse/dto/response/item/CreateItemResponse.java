package house.jpashophse.dto.response.item;

import lombok.Data;

@Data
public class CreateItemResponse {
    private Long sellerId;

    public CreateItemResponse(Long sellerId){
        this.sellerId = sellerId;
    }
}
