package house.jpashophse.dto.response.seller;

import house.jpashophse.domain.Address;
import house.jpashophse.domain.OrderItem;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SellerOrderItemDto {

    private Long orderItemId;
    private Long itemId;
    private String name;
    private int orderPrice;
    private int count;
    private LocalDateTime orderDate; //주문시간
    private Address address;

    public SellerOrderItemDto(OrderItem orderItem){
        orderItemId = orderItem.getId();
        itemId = orderItem.getItem().getId();
        name = orderItem.getItem().getName();
        orderPrice = orderItem.getOrderPrice();
        count = orderItem.getCount();
        orderDate = orderItem.getOrder().getOrderDate();
        address = orderItem.getOrder().getDelivery().getAddress();
    }
}
