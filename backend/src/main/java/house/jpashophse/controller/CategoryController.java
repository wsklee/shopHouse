package house.jpashophse.controller;

import house.jpashophse.domain.Category;
import house.jpashophse.domain.CategoryItem;
import house.jpashophse.dto.request.category.CategoryRequest;
import house.jpashophse.dto.response.item.ItemDto;
import house.jpashophse.dto.response.item.ItemPreviewDto;
import house.jpashophse.service.CategoryService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {

    private final CategoryService categoryService;

    // Create new category
    @PostMapping
    public CategoryDto createCategory(@RequestBody @Valid CategoryRequest request){
        Category category = Category.createCategory(request.getName());
        Long id = categoryService.saveCategory(category);
        return new CategoryDto(id, category.getName());
    }

    // Update a category
    @PutMapping("/{id}")
    public CategoryDto updateCategory(@PathVariable("id") Long id, @RequestBody @Valid CategoryRequest request){
        categoryService.updateCategory(id, request.getName());
        Category findCategory = categoryService.findOne(id);
        return new CategoryDto(findCategory.getId(), findCategory.getName());
    }

    // Delete a category
    @DeleteMapping("/{id}")
    public Result deleteCategory(@PathVariable("id") Long id){
        Long deletedCategoryId = categoryService.deleteCategory(id);
        return new Result(deletedCategoryId);
    }

    // Read all items of a category
    @GetMapping("/{id}")
    public CategoryItemListDto getAllItemsOfCategory(@PathVariable("id") Long categoryId){
        Category findCategory = categoryService.findOne(categoryId);
        List<CategoryItem> categoryItemsByCategory = categoryService.findCategoryItemsByCategory(categoryId);
        List<ItemPreviewDto> collect = categoryItemsByCategory.stream()
                .map(c-> new ItemPreviewDto(c.getItem()))
                .collect(Collectors.toList());
        return new CategoryItemListDto(findCategory.getName(), collect);
    }

    // Read All category
    @GetMapping
    public Result categories(){
        List<Category> findCategories = categoryService.findCategories();
        // Entity -> Dto
        List<CategoryDto> collect = findCategories.stream()
                .map(c -> new CategoryDto(c.getId(), c.getName()))
                .collect(Collectors.toList());
        return new Result(collect);
    }


    @Data
    @AllArgsConstructor
    static class Result<T>{
        private T data;
    }

    @Data
    @AllArgsConstructor
    static class CategoryDto{
        private Long id;
        private String name;
    }

    @Data
    @AllArgsConstructor
    static class CategoryItemListDto{
        private String categoryName;
        private List<ItemPreviewDto> itemList;
    }

}
