package house.jpashophse.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import house.jpashophse.domain.item.Item;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "category_item")
@Getter
@Setter
public class CategoryItem {

    @Id
    @GeneratedValue
    @Column(name = "category_item_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    // Constructor
    public static CategoryItem createCategoryItem(Category category){
        CategoryItem categoryItem = new CategoryItem();
        categoryItem.setCategory(category);
        return categoryItem;
    }
}
