package house.jpashophse.dto.response.seller;

import house.jpashophse.domain.item.Item;
import lombok.Data;

@Data
public class SellerItemDto {

    private Long itemId;
    private String name;
    private int price;

    private String mainImageUrl;

    public SellerItemDto(Item item){
        itemId = item.getId();
        name = item.getName();
        price = item.getPrice();
        mainImageUrl = item.getMainImageUrl();
    }
}
