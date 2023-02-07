package house.jpashophse.dto.request.review;

import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class UpdateReviewRequest {

    @NotBlank
    @Length(min = 10, max=500)
    private String description;

    @NotNull
    @Range(min = 1, max = 5)
    private int rating;
}
