package house.jpashophse.dto.response.member;

import house.jpashophse.domain.Member;
import house.jpashophse.domain.Authority;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class ReadMemberResponse {

    private Long id;

    private String name;

    private String profileImageUrl;

    private String city;
    private String street;
    private String zipcode;

    private Authority authority;

    private Long sellerId;

    private List<ReviewMemberDto> reviews;

    public ReadMemberResponse(Member member){
        id = member.getId();;
        name = member.getName();
        profileImageUrl = member.getProfileImageUrl();
        city = member.getAddress().getCity();
        street = member.getAddress().getStreet();
        zipcode = member.getAddress().getZipcode();
        authority = member.getAuthority();
        if(member.getAuthority().equals(Authority.ROLE_SELLER)){
            sellerId = member.getSeller().getId();
        } else {
            sellerId = 0L;
        }
        reviews = member.getReviews().stream()
                .map(review -> new ReviewMemberDto(review))
                .collect(Collectors.toList());
    }
}
