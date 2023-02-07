package house.jpashophse.repository;

import house.jpashophse.domain.item.Item;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ItemRepository {

    private final EntityManager em;

    public void save(Item item){
        em.persist(item);
    }

    public Item findOne(Long id){
        return em.find(Item.class, id);
    }

    public List<Item> findMany(List<Long> ids) {
        return em.createQuery("select i from Item i where i.id in :ids", Item.class)
                .setParameter("ids", ids)
                .getResultList();
    }

    public List<Item> findAll(int offset, int limit) {
        return em.createQuery("select i from Item i", Item.class)
                .setFirstResult(offset)
                .setMaxResults(limit)
                .getResultList();
    }
}
