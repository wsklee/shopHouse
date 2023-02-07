package house.jpashophse.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Category {

    @Id
    @GeneratedValue
    @Column(name = "category_id")
    private Long id;

    private String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<CategoryItem> categoryItems = new ArrayList<>();

    // Constructor
    public static Category createCategory(String name){
        Category category = new Category();
        category.setName(name);
        return category;
    }
}
