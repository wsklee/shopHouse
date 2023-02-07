package house.jpashophse.dto.response.seller;

import lombok.Data;

@Data
public class CreateSellerResponse {
    private Long id;
    public CreateSellerResponse(Long id){
        this.id = id;
    }
}
