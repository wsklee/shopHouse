package house.jpashophse.dto.request.member;

import house.jpashophse.domain.Address;
import house.jpashophse.domain.Authority;
import house.jpashophse.domain.Member;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.URL;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;


@Data
public class CreateMemberRequest {

    @NotNull
    @Email
    private String email;

    @NotBlank
    @Length(min=8, max=15)
    private String password;

    @NotBlank
    @Pattern(regexp = "^[A-Za-z0-9 ]+$", message = "name has to be alphanumeric")
    @Length(min=5, max=15)
    private String name;


    @NotBlank
    @URL
    private String profileImageUrl;

    @NotBlank
    private String city;
    @NotBlank

    private String street;
    @NotBlank
    private String zipcode;

    public Member toMember(PasswordEncoder passwordEncoder) {
        Member member = new Member();
        member.setEmail(email);
        member.setPassword(passwordEncoder.encode(password));
        member.setAuthority(Authority.ROLE_USER);
        member.setName(name);
        member.setProfileImageUrl(profileImageUrl);
        member.setAddress(new Address(city, street, zipcode));
        return member;
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}
