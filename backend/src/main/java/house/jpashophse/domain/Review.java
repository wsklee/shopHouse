package house.jpashophse.domain;

import house.jpashophse.domain.item.Item;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Review {

    @Id
    @GeneratedValue
    @Column(name = "review_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    private String description;

    private int rating;

    // Constructor
    public static Review createReview(Item item, Member member, String description, int rating){
        Review review = new Review();
        review.setDescription(description);
        review.setRating(rating);
        review.setItem(item);
        review.setMember(member);
        item.getReviews().add(review);
        member.getReviews().add(review);
        return review;
    }
}
