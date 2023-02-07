package house.jpashophse.service;

import house.jpashophse.domain.Cart;
import house.jpashophse.domain.Member;
import house.jpashophse.domain.item.Item;
import house.jpashophse.repository.CartRepository;
import house.jpashophse.repository.ItemRepository;
import house.jpashophse.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CartService {

    private final MemberRepository memberRepository;
    private final ItemRepository itemRepository;
    private final CartRepository cartRepository;

    @Transactional
    public Long createCart(Long memberId, Long itemId, int count){
        //Read Entity
        Member member = memberRepository.findOne(memberId);
        Item item = itemRepository.findOne(itemId);

        //Create Cart
        Cart cart = Cart.createCart(member, item, count);

        //Save cart
        cartRepository.save(cart);
        return cart.getId();
    }

    @Transactional
    public Long updateCart(Long id, int count){
        //Read Entity
        Cart cart = cartRepository.findOne(id);
        cart.setCount(count);
        return cart.getId();
    }

    public Cart findOne(Long cartId){return cartRepository.findOne(cartId);}

    @Transactional
    public void deleteCart(Long cartId){
        //Read Entity
        Cart cart = cartRepository.findOne(cartId);
        cartRepository.delete(cart);
    }
}
