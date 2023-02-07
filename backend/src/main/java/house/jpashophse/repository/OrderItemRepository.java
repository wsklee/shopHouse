package house.jpashophse.repository;

import house.jpashophse.domain.OrderItem;
import house.jpashophse.domain.Seller;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class OrderItemRepository {

    @PersistenceContext
    EntityManager em;

    public List<OrderItem> findOrderItemsBySeller(Seller seller){
        return em.createQuery("select o from OrderItem o where o.seller = :seller", OrderItem.class)
                .setParameter("seller", seller)
                .getResultList();
    }
}
