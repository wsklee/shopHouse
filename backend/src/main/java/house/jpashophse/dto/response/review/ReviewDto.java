package house.jpashophse.dto.response.review;

import house.jpashophse.domain.Review;
import lombok.Data;

@Data
public class ReviewDto {
    private Long reviewId;
    private String description;
    private int rating;

    public ReviewDto(Review review){
        reviewId = review.getId();
        description = review.getDescription();
        rating = review.getRating();
    }
}
