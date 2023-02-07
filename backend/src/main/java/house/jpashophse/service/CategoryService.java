package house.jpashophse.service;

import house.jpashophse.domain.Category;
import house.jpashophse.domain.CategoryItem;
import house.jpashophse.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    /**
     * Create Category
     */
    @Transactional
    public Long saveCategory(Category category) {
        validateDuplicateCategory(category);
        categoryRepository.save(category);
        return category.getId();
    }

    @Transactional
    public Long updateCategory(Long id, String name){
        Category category = categoryRepository.findOne(id);
        category.setName(name);
        return category.getId();
    }

    @Transactional
    public Long deleteCategory(Long id){
        Category category = categoryRepository.findOne(id);
        categoryRepository.delete(category);
        return id;
    }

    public List<Category> findCategories(){return categoryRepository.findAll();}

    public Category findOne(Long id){return categoryRepository.findOne(id);}

    public List<CategoryItem> findCategoryItemsByCategory(Long categoryId){
        Category category = categoryRepository.findOne(categoryId);
        List<CategoryItem> categoryItemsByCategory = categoryRepository.findCategoryItemsByCategory(category);
        return categoryItemsByCategory;
    }

    private void validateDuplicateCategory(Category category){
        List<Category> findCategories = categoryRepository.findByName(category.getName());
        if(!findCategories.isEmpty()){
            throw new IllegalStateException("이미 존재하는 카테고리입니다");
        }
    }
}
