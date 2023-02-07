package house.jpashophse.controller;

import house.jpashophse.domain.Member;
import house.jpashophse.domain.OrderItem;
import house.jpashophse.domain.Seller;
import house.jpashophse.dto.request.seller.CreateSellerRequest;
import house.jpashophse.dto.response.seller.CreateSellerResponse;
import house.jpashophse.dto.response.seller.SellerDto;
import house.jpashophse.dto.response.seller.SellerOrderItemDto;
import house.jpashophse.service.MemberService;
import house.jpashophse.service.SellerService;
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
@RequestMapping("/api/sellers")
public class SellerController {

    private final SellerService sellerService;
    private final MemberService memberService;

    // Create Seller
    @PostMapping
    public CreateSellerResponse create(@RequestBody @Valid CreateSellerRequest request){
        Long id = sellerService.createSeller(SecurityUtil.getCurrentMemberId(), request.getCompanyName(), request.getCompanyEmail(), request.getCompanyImageUrl());
        return new CreateSellerResponse(id);
    }

    // Read one seller
    @GetMapping("/{sellerId}")
    public SellerDto seller(@PathVariable("sellerId") Long sellerId){
        Seller findSeller = sellerService.findOne(sellerId);
        return new SellerDto(findSeller);
    }

    // Read current loggedin seller
    @GetMapping("/me")
    public SellerDto currentSeller(){
        Member findMember = memberService.findOne(SecurityUtil.getCurrentMemberId());
        Seller findSeller = sellerService.findOne(findMember.getSeller().getId());
        return new SellerDto(findSeller);
    }

    @GetMapping("/me/orders")
    public Result currentSellerOrders(){
        Member findMember = memberService.findOne(SecurityUtil.getCurrentMemberId());
        Seller findSeller = sellerService.findOne(findMember.getSeller().getId());
        List<OrderItem> orderItemsOfSeller = sellerService.findOrderItemsOfSeller(findSeller);
        List<SellerOrderItemDto> collect = orderItemsOfSeller.stream()
                .map(i-> new SellerOrderItemDto(i))
                .collect(Collectors.toList());
        return new Result(collect);
    }

    @Data
    @AllArgsConstructor
    static class Result<T>{
        private T data;
    }
}
