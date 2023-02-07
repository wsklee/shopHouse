package house.jpashophse.service;

import house.jpashophse.domain.*;
import house.jpashophse.domain.item.Item;
import house.jpashophse.domain.item.ItemIdQuantity;
import house.jpashophse.domain.item.ItemQuantity;
import house.jpashophse.exception.AlreadyCancelledException;
import house.jpashophse.exception.ItemNotFoundException;
import house.jpashophse.exception.UnauthorizedMemberException;
import house.jpashophse.repository.ItemRepository;
import house.jpashophse.repository.MemberRepository;
import house.jpashophse.repository.OrderRepository;
import house.jpashophse.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderService {

    private final MemberRepository memberRepository;
    private final OrderRepository orderRepository;
    private final ItemRepository itemRepository;

    @Transactional
    public Long order(Long memberId, List<ItemIdQuantity> itemIdQuantityList){
        // Parse itemIdQuantityList
        List<Long> itemIds = itemIdQuantityList.stream()
                .map(itemIdQuantity -> itemIdQuantity.getItemId())
                .collect(Collectors.toList());

        // Read Entity
        Member member = memberRepository.findOne(memberId);
        List<ItemQuantity> itemQuantityList = new ArrayList<>();

        for(ItemIdQuantity itemIdQuantity : itemIdQuantityList) {
            Item item = itemRepository.findOne(itemIdQuantity.getItemId());
            itemQuantityList.add(new ItemQuantity(item, itemIdQuantity.getItemCount()));
        }

        // Create Delivery
        Delivery delivery = new Delivery();
        delivery.setAddress(member.getAddress());
        delivery.setStatus(DeliveryStatus.READY);

        // Create OrderItems
        List<OrderItem> orderItems = itemQuantityList.stream()
                .map(itemQuantity -> OrderItem.createOrderItem(itemQuantity.getItem(), itemQuantity.getItem().getPrice(), itemQuantity.getItemCount()))
                .collect(Collectors.toList());


        // Create Order
        Order order = Order.createOrder(member, delivery, orderItems);

        // Save Order
        orderRepository.save(order);
        return order.getId();
    }

    @Transactional
    public void cancelOrder(Long orderId) {
        //주문 엔티티 조회
        Order order = orderRepository.findOne(orderId);

        if(!order.getMember().getId().equals(SecurityUtil.getCurrentMemberId())){
            throw new UnauthorizedMemberException("Unauthorized member");
        }

        if(order.getStatus().equals(OrderStatus.CANCEL)){
            throw new AlreadyCancelledException("Order is already cancelled");
        }
        //주문 취소
        order.cancel();
    }

    public List<Order> findOrders(OrderSearch orderSearch) {
        return orderRepository.findAllWithFilter(orderSearch);
    }

    public List<Order> findMemberOrders(Long memberId) {
        return orderRepository.findByMember(memberId);
    }
}
