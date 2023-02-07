package house.jpashophse.controller;

import house.jpashophse.dto.auth.*;
import house.jpashophse.dto.request.member.CreateMemberRequest;
import house.jpashophse.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;

    private static final long REFRESH_TOKEN_EXPIRE_TIME = 60 * 60 * 24 * 7;  // 7일

    @PostMapping("/auth/signup")
    public ResponseEntity<MemberResponseDto> signup(@RequestBody @Valid CreateMemberRequest createMemberRequest) {
        log.info("/////////////////  Signed up /////////////////////////");
        return ResponseEntity.ok(authService.signup(createMemberRequest));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<TokenResponseDto> login(@RequestBody MemberRequestDto memberRequestDto) {
        TokenDto tokenDto = authService.login(memberRequestDto);
        ResponseCookie responseCookie = ResponseCookie.from("refreshToken", tokenDto.getRefreshToken())
                .httpOnly(false)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(REFRESH_TOKEN_EXPIRE_TIME)
                .build();
        log.info("///////////////// Logged In /////////////////////////");
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,responseCookie.toString())
                .body(new TokenResponseDto(tokenDto));
    }

    @GetMapping("/auth/reissue")
    public ResponseEntity<TokenResponseDto> reissue(@CookieValue("refreshToken") String refreshToken) {
        TokenDto tokenDto = authService.reissue(refreshToken);
        ResponseCookie responseCookie = ResponseCookie.from("refreshToken", tokenDto.getRefreshToken())
                .httpOnly(false)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(REFRESH_TOKEN_EXPIRE_TIME)
                .build();
        log.info("/////////////////  Token Reissued /////////////////////////");
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,responseCookie.toString())
                .body(new TokenResponseDto(tokenDto));
    }

    @DeleteMapping("/auth/logout")
    public ResponseEntity<String> logout(@CookieValue("refreshToken") String refreshToken){
        authService.logout(refreshToken);
        ResponseCookie responseCookie = ResponseCookie.from("refreshToken", null)
                .httpOnly(false)
                .secure(true)
                .sameSite("None")
                .path("/")
                .maxAge(0)
                .build();
        log.info("/////////////////  Logged Out /////////////////////////");
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE,responseCookie.toString())
                .body(null);

    }
}
