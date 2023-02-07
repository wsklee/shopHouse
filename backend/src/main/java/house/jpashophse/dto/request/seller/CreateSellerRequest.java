package house.jpashophse.dto.request.seller;

import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.*;

@Data
public class CreateSellerRequest {

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9-() ]+$", message = "name has to be alphanumeric")
    @Length(min=5, max=15)
    private String companyName;

    @NotNull
    @Email
    private String companyEmail;

    @NotNull
    @URL
    private String companyImageUrl;
}
