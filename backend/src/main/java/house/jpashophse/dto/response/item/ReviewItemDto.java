package house.jpashophse.dto.response.item;

import house.jpashophse.domain.Review;
import lombok.Data;

@Data
public class ReviewItemDto {

    private Long reviewId;
    private String description;
    private int rating;

    private Long memberId;
    private String memberName;
    private String memberProfileImage;

    public ReviewItemDto(Review review){
        reviewId = review.getId();
        description = review.getDescription();
        rating = review.getRating();
        memberId = review.getMember().getId();
        memberName = review.getMember().getName();
        memberProfileImage = review.getMember().getProfileImageUrl();
    }
}
