package house.jpashophse.controller;

import house.jpashophse.domain.Order;
import house.jpashophse.domain.OrderSearch;
import house.jpashophse.dto.request.order.CreateOrderRequest;
import house.jpashophse.dto.response.order.CreateOrderResponse;
import house.jpashophse.dto.response.order.OrderDto;
import house.jpashophse.exception.UnauthorizedMemberException;
import house.jpashophse.repository.OrderRepository;
import house.jpashophse.service.OrderService;
import house.jpashophse.util.SecurityUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

import static java.util.stream.Collectors.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class OrderController {

    private final OrderService orderService;
    private final OrderRepository orderRepository;

    /**
     *
     * Create Order
     */
    @PostMapping("/orders")
    public CreateOrderResponse order(@RequestBody @Valid CreateOrderRequest request){
        Long order = orderService.order(SecurityUtil.getCurrentMemberId(), request.getItemIdQuantityList());
        return new CreateOrderResponse(order);
    }


    // Viewing ALL created orders

    @GetMapping("/orders")
    public Result orderList(@RequestParam(value = "offset", defaultValue = "0") int offset,
                            @RequestParam(value = "limit", defaultValue = "100") int limit){
        List<Order> orders = orderRepository.findAll(offset, limit);
        List<OrderDto> collect = orders.stream()
                .map(o -> new OrderDto(o))
                .collect(toList());
        return new Result(collect);
    }

    @GetMapping("/orders/{orderId}")
    public OrderDto getOrder(@PathVariable("orderId") Long orderId){
        Order order = orderRepository.findOne(orderId);
        if(!order.getMember().getId().equals(SecurityUtil.getCurrentMemberId())){
            throw new UnauthorizedMemberException("Unauthorized member");
        }
        return new OrderDto(order);
    }

    // Viewing FILTERED created orders
    @GetMapping("/orders/filter")
    public Result filteredOrderList(@ModelAttribute("orderSearch") OrderSearch orderSearch){
        List<Order> orders = orderService.findOrders(orderSearch);
        List<OrderDto> collect = orders.stream()
                .map(o -> new OrderDto(o))
                .collect(toList());
        return new Result(collect);
    }

    // View Orders for one Member
    @GetMapping("/members/orders")
    public Result memberOrderList(){
        List<Order> orders = orderService.findMemberOrders(SecurityUtil.getCurrentMemberId());
        List<OrderDto> collect = orders.stream()
                .map(o -> new OrderDto(o))
                .collect(toList());
        return new Result(collect);
    }


    // Cancel Order
    @PostMapping(value = "/orders/{orderId}/cancel")
    public Result cancelOrder(@PathVariable("orderId") Long orderId){
        orderService.cancelOrder(orderId);
        return new Result(orderId);
    }

    @Data
    @AllArgsConstructor
    static class Result<T>{
        private T data;
    }
}
