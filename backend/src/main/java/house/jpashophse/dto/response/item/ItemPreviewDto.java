package house.jpashophse.dto.response.item;

import house.jpashophse.domain.item.Item;
import lombok.Data;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Data
public class ItemPreviewDto {

    private Long id;
    private String name;
    private int price;

    private String mainImageUrl;

    private String sellerName;
    private Long sellerId;

    public ItemPreviewDto(Item item){
        id = item.getId();
        name = item.getName();
        price = item.getPrice();
        mainImageUrl = item.getMainImageUrl();
        sellerName = item.getSeller().getCompanyName();
        sellerId = item.getSeller().getId();
    }
}
