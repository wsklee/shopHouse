package house.jpashophse.repository;

import house.jpashophse.domain.Cart;
import house.jpashophse.domain.Category;
import house.jpashophse.domain.CategoryItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CategoryRepository {

    @PersistenceContext
    EntityManager em;

    public Long save(Category category){
        em.persist(category);
        return category.getId();
    }

    public Category findOne(Long id){
        return em.find(Category.class, id);
    }

    public List<Category> findAll(){
        return em.createQuery("select c from Category c", Category.class).getResultList();
    }

    public List<Category> findByName(String name){
        return em.createQuery("select c from Category c where c.name = :name", Category.class)
                .setParameter("name", name)
                .getResultList();

    }

    public List<CategoryItem> findCategoryItemsByCategory(Category category){
        return em.createQuery("select c from CategoryItem c where c.category = :category", CategoryItem.class)
                .setParameter("category", category)
                .getResultList();
    }

    public void delete(Category category){em.remove(category);}
}
