package house.jpashophse.dto.response.item;

import house.jpashophse.domain.item.Item;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.*;

@Data
public class ItemDto {

    private Long id;
    private String name;
    private int price;
    private String description;
    private int stockQuantity;

    private String mainImageUrl;

    private String sellerName;
    private Long sellerId;

    private List<CategoryItemDto> categoryItems;

    private List<ReviewItemDto> reviews;

    public ItemDto(Item item){
        id = item.getId();
        name = item.getName();
        price = item.getPrice();
        description = item.getDescription();
        stockQuantity = item.getStockQuantity();
        mainImageUrl = item.getMainImageUrl();
        sellerName = item.getSeller().getCompanyName();
        sellerId = item.getSeller().getId();
        categoryItems = item.getCategoryItems().stream()
                .map(categoryItem -> new CategoryItemDto(categoryItem))
                .collect(toList());
        reviews = item.getReviews().stream()
                .map(review -> new ReviewItemDto(review))
                .collect(toList());
    }
}
