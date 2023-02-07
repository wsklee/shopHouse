package house.jpashophse.controller;

import house.jpashophse.domain.Cart;
import house.jpashophse.dto.request.cart.CreateCartRequest;
import house.jpashophse.dto.request.cart.UpdateCartRequest;
import house.jpashophse.dto.response.cart.CartDto;
import house.jpashophse.dto.response.cart.ReadCartResponse;
import house.jpashophse.repository.CartRepository;
import house.jpashophse.service.CartService;
import house.jpashophse.util.SecurityUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members/cart")
public class CartController {

    private final CartService cartService;
    private final CartRepository cartRepository;

    @PostMapping
    public Result createCart(@RequestBody @Valid CreateCartRequest request){
        Long cartId = cartService.createCart(SecurityUtil.getCurrentMemberId(), request.getItemId(), request.getItemCount());
        return new Result(cartId);
    }

    // Update Cart
    @PutMapping("/{cartId}")
    public Result updateCart(@PathVariable("cartId") Long cartId, @RequestBody @Valid UpdateCartRequest request){
        Long id = cartService.updateCart(cartId, request.getItemCount());
        return new Result(id);
    }

    // Delete Cart
    @DeleteMapping("/{cartId}")
    public Result deleteCart(@PathVariable("cartId") Long cartId){
        cartService.deleteCart(cartId);
        return new Result("deleted");
    }

    // Read one Cart
    @GetMapping("/{cartId}")
    public ReadCartResponse getCart(@PathVariable("cartId") Long cartId){
        Cart cart = cartService.findOne(cartId);
        return new ReadCartResponse(cart);
    }

    // Read ALL carts of logged-in member
    @GetMapping
    public ResultWithTotalPrice cartList(){
        List<Cart> findCarts = cartRepository.findByMember(SecurityUtil.getCurrentMemberId());
        List<CartDto> collect = findCarts.stream()
                .map(cart -> new CartDto(cart))
                .collect(Collectors.toList());
        long cartTotalPrice = 0L;
        for(Cart cart: findCarts){
            cartTotalPrice += cart.getTotalPrice();
        }
        return new ResultWithTotalPrice(collect, cartTotalPrice);
    }

    // Delete ALL carts of logged-in member
    @DeleteMapping
    public Result deleteCartList(){
        List<Cart> findCarts = cartRepository.findByMember(SecurityUtil.getCurrentMemberId());
        for(Cart cart: findCarts){
            cartService.deleteCart(cart.getId());
        }
        return new Result("deleted");
    }

    @Data
    @AllArgsConstructor
    static class Result<T>{
        private T data;
    }

    @Data
    @AllArgsConstructor
    static class ResultWithTotalPrice<T>{
        private T data;
        private Long totalPrice;
    }
}
