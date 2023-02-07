package house.jpashophse.dto.response.member;

import lombok.Data;

@Data
public class UpdateMemberResponse {
    private Long id;
    private String name;

    public UpdateMemberResponse(Long id, String name){
        this.id = id;
        this.name = name;
    }
}
