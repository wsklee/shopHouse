package house.jpashophse.dto.auth;

import lombok.Data;

@Data
public class TokenResponseDto {
    private String grantType;
    private String accessToken;
    private Long accessTokenExpiresIn;

    public TokenResponseDto(TokenDto tokenDto){
        grantType = tokenDto.getGrantType();
        accessToken = tokenDto.getAccessToken();
        accessTokenExpiresIn = tokenDto.getAccessTokenExpiresIn();
    }
}
