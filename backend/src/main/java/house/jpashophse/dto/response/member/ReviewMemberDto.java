package house.jpashophse.dto.response.member;

import house.jpashophse.domain.Review;
import lombok.Data;

@Data
public class ReviewMemberDto {

    private Long reviewId;
    private String description;
    private int rating;

    private Long itemId;

    private String itemName;

    public ReviewMemberDto(Review review) {
        reviewId = review.getId();
        description = review.getDescription();
        rating = review.getRating();
        itemId = review.getItem().getId();
        itemName = review.getItem().getName();
    }
}
