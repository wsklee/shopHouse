package house.jpashophse.dto.request.item;

import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;
import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.*;

@Data
public class UpdateItemRequest {

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9-() ]+$", message = "name has to be alphanumeric")
    private String name;

    @NotNull
    @Range(min = 1000, max = 100000000)
    private int price;

    @NotNull
    @Positive
    @Max(value = 9999)
    private int stockQuantity;

    @NotBlank
    @Length(min = 10, max=500)
    private String description;

    @NotBlank
    @URL
    private String mainImageUrl;
}

