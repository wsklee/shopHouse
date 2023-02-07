package house.jpashophse.dto.response.member;

import house.jpashophse.domain.Address;
import lombok.Data;

import javax.persistence.Embedded;

@Data
public class CreateMemberResponse {

    private Long id;

    public CreateMemberResponse(Long id){
        this.id = id;
    }
}
