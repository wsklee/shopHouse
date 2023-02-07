package house.jpashophse.controller;

import house.jpashophse.domain.Address;
import house.jpashophse.domain.Member;
import house.jpashophse.dto.request.member.UpdateMemberRequest;
import house.jpashophse.dto.response.member.ReadMemberResponse;
import house.jpashophse.dto.response.member.UpdateMemberResponse;
import house.jpashophse.service.MemberService;
import house.jpashophse.util.SecurityUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    @PatchMapping("/me")
    public UpdateMemberResponse updateMember(@RequestBody @Valid UpdateMemberRequest request){
        memberService.update(SecurityUtil.getCurrentMemberId(), request.getName(), request.getProfileImageUrl(), new Address(request.getCity(), request.getStreet(), request.getZipcode()));
        Member findMember = memberService.findOne(SecurityUtil.getCurrentMemberId());
        return new UpdateMemberResponse(findMember.getId(), findMember.getName());
    }

    @GetMapping("")
    public Result members(){
        List<Member> findMembers = memberService.findMembers();
        //Entity -> DTO
        List<MemberDto> collect = findMembers.stream()
                .map(m -> new MemberDto(m.getName(), m.getProfileImageUrl()))
                .collect(Collectors.toList());
        return new Result(collect);
    }

    // Read one member
    @GetMapping("/{memberId}")
    public ReadMemberResponse member(@PathVariable("memberId") Long memberId){
        Member findMember = memberService.findOne(memberId);
        return new ReadMemberResponse(findMember);
    }

    // Read the current logged-in user
    @GetMapping("/me")
    public ReadMemberResponse currentMember(){
        Member findMember = memberService.findOne(SecurityUtil.getCurrentMemberId());
        return new ReadMemberResponse(findMember);
    }


    @Data
    @AllArgsConstructor
    static class Result<T>{
        private T data;
    }

    @Data
    @AllArgsConstructor
    static class MemberDto{
        private String name;
        private String profileImageUrl;
    }
}
