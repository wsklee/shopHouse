package house.jpashophse.controller;

import house.jpashophse.domain.Authority;
import house.jpashophse.domain.Member;
import house.jpashophse.domain.item.Item;
import house.jpashophse.dto.request.item.CreateItemRequest;
import house.jpashophse.dto.request.item.UpdateItemRequest;
import house.jpashophse.dto.response.item.CreateItemResponse;
import house.jpashophse.dto.response.item.ItemDto;
import house.jpashophse.dto.response.item.ItemPreviewDto;
import house.jpashophse.exception.UnauthorizedMemberException;
import house.jpashophse.repository.ItemRepository;
import house.jpashophse.service.ItemService;
import house.jpashophse.service.MemberService;
import house.jpashophse.util.SecurityUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;
    private final MemberService memberService;
    private final ItemRepository itemRepository;

    @PostMapping
    public CreateItemResponse create(@RequestBody @Valid CreateItemRequest request) throws Exception {
        Long sellerId = verifySeller();
        Long id = itemService.createItem(sellerId, request.getName(), request.getPrice(), request.getStockQuantity(), request.getDescription(), request.getMainImageUrl(), request.getCategoryId());
        return new CreateItemResponse(sellerId);
    }

    // Find One Item with its reviews
    @GetMapping("/{itemId}")
    public ItemDto itemWithReviews(@PathVariable("itemId") Long itemId){
        Item findItem = itemService.findOne(itemId);
        System.out.println("findItem = " + findItem);
        return new ItemDto(findItem);
    }

    // Read ALL items
    @GetMapping
    public Result itemsList(@RequestParam(value = "offset", defaultValue = "0") int offset,
                            @RequestParam(value = "limit", defaultValue = "100") int limit){
        List<Item> findItems = itemRepository.findAll(offset, limit);
        List<ItemPreviewDto> collect = findItems.stream()
                .map(i -> new ItemPreviewDto(i))
                .collect(Collectors.toList());
        return new Result(collect);
    }

    @PatchMapping("/{itemId}")
    public Result updateItem(@PathVariable("itemId") Long itemId, @RequestBody @Valid UpdateItemRequest request) throws Exception{
        Long sellerId = verifySeller();
        Long id = itemService.updateItem(itemId, request.getName(), request.getPrice(), request.getStockQuantity(), request.getDescription(), request.getMainImageUrl());
        return new Result(sellerId);

    }

    private Long verifySeller(){
        Member findMember = memberService.findOne(SecurityUtil.getCurrentMemberId());
        if (findMember.getAuthority().equals(Authority.ROLE_USER)) {
            throw new UnauthorizedMemberException();
        }
        return findMember.getSeller().getId();
    }



    @Data
    @AllArgsConstructor
    static class Result<T>{
        private T data;
    }
}
