package house.jpashophse.domain;

import house.jpashophse.domain.item.Item;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Cart {

    @Id
    @GeneratedValue
    @Column(name = "cart_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    private int count;

    // Constructor
    public static Cart createCart(Member member, Item item, int count){
        Cart cart = new Cart();
        cart.setCount(count);
        cart.setItem(item);
        cart.setMember(member);
        member.getCarts().add(cart);
        return cart;
    }

    public Long getTotalPrice(){ return (long) getCount() * getItem().getPrice();}
}
