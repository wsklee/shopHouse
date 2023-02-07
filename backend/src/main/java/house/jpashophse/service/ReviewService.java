package house.jpashophse.service;

import house.jpashophse.domain.Member;
import house.jpashophse.domain.Review;
import house.jpashophse.domain.item.Item;
import house.jpashophse.repository.ItemRepository;
import house.jpashophse.repository.MemberRepository;
import house.jpashophse.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ReviewService {

    private final MemberRepository memberRepository;
    private final ItemRepository itemRepository;
    private final ReviewRepository reviewRepository;

    @Transactional
    public Long createReview(Long memberId, Long itemId, String description, int rating){
        //Read Entity
        Member member = memberRepository.findOne(memberId);
        Item item = itemRepository.findOne(itemId);

        // Create Review
        Review review = Review.createReview(item, member, description, rating);

        // Save Review
        reviewRepository.save(review);
        return review.getId();
    }

    @Transactional
    public Long updateReview(Long id, String description, int rating){
        //Read Entity
        Review review = reviewRepository.findOne(id);
        review.setDescription(description);
        review.setRating(rating);
        return review.getId();
    }

    public Review findOne(Long reviewId){return reviewRepository.findOne(reviewId);}
}
