package house.jpashophse.dto.response.order;

import house.jpashophse.domain.OrderItem;
import lombok.Data;

@Data
public class OrderItemDto {

    private Long itemId;
    private String itemName;//상품 명
    private String itemImageUrl;
    private int orderPrice; //주문 가격
    private int count; //주문 수량
    public OrderItemDto(OrderItem orderItem) {
        itemName = orderItem.getItem().getName();
        itemId = orderItem.getItem().getId();
        itemImageUrl = orderItem.getItem().getMainImageUrl();
        orderPrice = orderItem.getOrderPrice();
        count = orderItem.getCount();
    }

}
