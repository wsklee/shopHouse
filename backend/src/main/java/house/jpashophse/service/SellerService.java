package house.jpashophse.service;

import house.jpashophse.domain.Member;
import house.jpashophse.domain.OrderItem;
import house.jpashophse.domain.Seller;
import house.jpashophse.repository.MemberRepository;
import house.jpashophse.repository.OrderItemRepository;
import house.jpashophse.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SellerService {

    private final SellerRepository sellerRepository;
    private final MemberRepository memberRepository;

    private final OrderItemRepository orderItemRepository;

    @Transactional
    public Long createSeller(Long memberId, String companyName, String companyEmail, String companyImageUrl){
        validateDuplicateSeller(companyName);

        // Read Entity
        Member member = memberRepository.findOne(memberId);

        // Create Seller
        Seller seller = Seller.createSeller(member, companyName, companyEmail, companyImageUrl);

        // Save seller
        sellerRepository.save(seller);
        return seller.getId();
    }

    private void validateDuplicateSeller(String companyName) {
        List<Seller> findSellers = sellerRepository.findByName(companyName);
        if(!findSellers.isEmpty()){
            throw new IllegalStateException("이미 존재하는 셀러입니다");
        }
    }

    // Find

    public List<Seller> findSellers(){return sellerRepository.findAll();}

    public List<OrderItem> findOrderItemsOfSeller(Seller seller){return orderItemRepository.findOrderItemsBySeller(seller);}

    public Seller findOne(Long sellerId){return sellerRepository.findOne(sellerId);}
}
