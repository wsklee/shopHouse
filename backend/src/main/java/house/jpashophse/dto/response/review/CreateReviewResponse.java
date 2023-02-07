package house.jpashophse.dto.response.review;

import lombok.Data;

@Data
public class CreateReviewResponse {

    private Long id;

    public CreateReviewResponse(Long id){
        this.id = id;
    }
}
