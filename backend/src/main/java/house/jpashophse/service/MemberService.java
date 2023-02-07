package house.jpashophse.service;

import house.jpashophse.domain.Address;
import house.jpashophse.domain.Member;
import house.jpashophse.dto.auth.MemberResponseDto;
import house.jpashophse.exception.DuplicateMemberException;
import house.jpashophse.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    /**
     *
     * Update Member
     */
    @Transactional
    public void update(Long id, String name, String profileImageUrl, Address address){
        Member member = memberRepository.findOne(id);
        member.setName(name);
        member.setProfileImageUrl(profileImageUrl);
        member.setAddress(address);
    }

    private void validateDuplicateMember(Member member) {
        if(!memberRepository.existsByEmail(member.getEmail())){
            throw new DuplicateMemberException("이미 존재하는 회원입니다");
        }
    }



    /**
     *  Find all members
     */
    public List<Member> findMembers(){
        return memberRepository.findAll();
    }

    public Member findOne(Long memberId){
        return memberRepository.findOne(memberId);
    }
}
