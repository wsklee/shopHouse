package house.jpashophse.dto.request.category;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Data
public class CategoryRequest{
    @NotEmpty
    @Length(max = 30)
    @Pattern(regexp = "^[A-Za-z ]+$", message = "name has to be alphabetical")
    private String name;
}
