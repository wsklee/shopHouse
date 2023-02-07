package house.jpashophse.dto.response.item;

import house.jpashophse.domain.CategoryItem;
import lombok.Data;

@Data
public class CategoryItemDto {

    private String categoryName;
    private Long categoryId;

    public CategoryItemDto(CategoryItem categoryItem){
        categoryName = categoryItem.getCategory().getName();
        categoryId = categoryItem.getCategory().getId();
    }
}
