package house.jpashophse.controller;

import house.jpashophse.domain.Review;
import house.jpashophse.dto.request.review.CreateReviewRequest;
import house.jpashophse.dto.request.review.UpdateReviewRequest;
import house.jpashophse.dto.response.review.CreateReviewResponse;
import house.jpashophse.dto.response.review.ReviewDto;
import house.jpashophse.dto.response.review.UpdateReviewResponse;
import house.jpashophse.repository.ReviewRepository;
import house.jpashophse.service.ReviewService;
import house.jpashophse.util.SecurityUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final ReviewService reviewService;

    @PostMapping("/items/{itemId}/reviews")
    public CreateReviewResponse create(@PathVariable("itemId") Long itemId, @RequestBody @Valid CreateReviewRequest request){
        Long id = reviewService.createReview(SecurityUtil.getCurrentMemberId(), itemId, request.getDescription(), request.getRating());
        return new CreateReviewResponse(id);
    }

    // View ALL reviews
    @GetMapping("/reviews")
    public Result reviewsList(@RequestParam(value = "offset", defaultValue = "0") int offset,
                              @RequestParam(value = "limit", defaultValue = "100") int limit){
        List<Review> reviews = reviewRepository.findAll(offset, limit);
        List<ReviewDto> collect = reviews.stream()
                .map(r -> new ReviewDto(r))
                .collect(Collectors.toList());
        return new Result(collect);
    }

    // View filtered reviews

    // Update a review
    @PutMapping("/reviews/{reviewId}")
    public UpdateReviewResponse updateReview(@PathVariable("reviewId") Long reviewId, @RequestBody @Valid UpdateReviewRequest request){
        Long id = reviewService.updateReview(reviewId, request.getDescription(), request.getRating());
        return new UpdateReviewResponse(id);
    }

    @Data
    @AllArgsConstructor
    static class Result<T>{
        private T data;
    }
}
