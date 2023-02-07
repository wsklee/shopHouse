package house.jpashophse.domain.item;

import lombok.Data;

@Data
public class ItemQuantity {

    private Item item;
    private int itemCount;

    public ItemQuantity(Item item, int itemCount){
        this.item = item;
        this.itemCount = itemCount;
    }
}
