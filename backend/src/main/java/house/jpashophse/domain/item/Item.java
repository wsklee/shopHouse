package house.jpashophse.domain.item;

import house.jpashophse.domain.*;
import house.jpashophse.exception.NotEnoughStockException;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Item {

    @Id
    @GeneratedValue
    @Column(name = "item_id")
    private Long id;

    private String name;
    private int price;
    private int stockQuantity;
    private String description;
    private String mainImageUrl;

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<CategoryItem> categoryItems = new ArrayList<>();

    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private Seller seller;

    // Constructor

    public static Item createItem(Seller seller,String name, int price, int stockQuantity, String description, String mainImageUrl, CategoryItem... categoryItems){
        Item item = new Item();
        item.setName(name);
        item.setPrice(price);
        item.setStockQuantity(stockQuantity);
        item.setDescription(description);
        item.setMainImageUrl(mainImageUrl);
        item.addSeller(seller);
        for(CategoryItem categoryItem : categoryItems){
            item.addCategoryItem(categoryItem);
        }
        return item;
    }

    // 연관관계 메서드
    public void addCategoryItem(CategoryItem categoryItem){
        categoryItems.add(categoryItem);
        categoryItem.setItem(this);
    }

    public void addSeller(Seller newSeller){
        seller = newSeller;
        newSeller.getItems().add(this);
    }

    // business logic

    public void addStock(int quantity){
        this.stockQuantity += quantity;
    }

    public void removeStock(int quantity){
        int restStock = this.stockQuantity - quantity;
        if(restStock < 0){
            throw new NotEnoughStockException("need more stock");
        }
        this.stockQuantity = restStock;
    }

    // ratingsum
    // ratingcount
}
