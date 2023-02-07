package house.jpashophse.dto.response.review;

import lombok.Data;

@Data
public class UpdateReviewResponse {
    private Long id;
    public UpdateReviewResponse(Long id){
        this.id = id;
    }
}
