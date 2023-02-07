package house.jpashophse.dto.response.cart;

import house.jpashophse.domain.Cart;
import lombok.Data;

@Data
public class ReadCartResponse {

    private Long cartId;
    private Long itemId;
    private String itemName;
    private String itemMainImageUrl;

    private int itemPrice;
    private int itemCount;

    public ReadCartResponse(Cart cart){
        cartId = cart.getId();
        itemId = cart.getItem().getId();
        itemName = cart.getItem().getName();
        itemMainImageUrl = cart.getItem().getMainImageUrl();
        itemCount = cart.getCount();
        itemPrice = cart.getItem().getPrice();
    }
}
