package house.jpashophse.dto.request.member;

import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.URL;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class UpdateMemberRequest {

    @NotBlank
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "name has to be alphanumeric")
    @Length(min=5, max=15)
    private String name;

    @NotBlank
    @URL
    private String profileImageUrl;

    @NotBlank
    @Pattern(regexp="^[A-Za-z]*$",message = "city has to be alphabetical")
    private String city;
    @NotBlank
    @Pattern(regexp = "^[A-Za-z0-9]+$", message = "street has to be alphanumeric")
    private String street;
    @NotBlank
    @Pattern(regexp = "^[0-9]+$", message = "zipcode has to be numeric")
    private String zipcode;
}
