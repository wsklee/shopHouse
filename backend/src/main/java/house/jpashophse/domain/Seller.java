package house.jpashophse.domain;

import house.jpashophse.domain.item.Item;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Seller {

    @Id
    @GeneratedValue
    @Column(name = "seller_id")
    private Long id;

    private String companyName;
    private String companyEmail;
    private String companyImageUrl;

    @OneToOne(mappedBy = "seller", fetch = FetchType.LAZY)
    private Member member;

    @OneToMany(mappedBy = "seller", cascade = CascadeType.ALL)
    private List<Item> items = new ArrayList<>();

    @OneToMany(mappedBy = "seller", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();

    public static Seller createSeller(Member member, String companyName, String companyEmail, String companyImageUrl){
        Seller seller = new Seller();
        seller.setCompanyName(companyName);
        seller.setCompanyEmail(companyEmail);
        seller.setCompanyImageUrl(companyImageUrl);
        seller.setMember(member);
        member.setSeller(seller);
        member.setAuthority(Authority.ROLE_SELLER);
        return seller;
    }
}
