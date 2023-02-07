package house.jpashophse.repository;

import house.jpashophse.domain.Cart;
import house.jpashophse.domain.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CartRepository {

    private final EntityManager em;

    public void save(Cart cart){ em.persist(cart);}

    public Cart findOne(Long id){
        return em.find(Cart.class, id);
    }

    public void delete(Cart cart){em.remove(cart);}

    public List<Cart> findByMember(Long memberId){
        return em.createQuery(
                "select c from Cart c"+
                        " join fetch c.member m" +
                        " join fetch c.item i" +
                        " where m.id = :member", Cart.class)
                .setParameter("member", memberId)
                .getResultList();
    }
}
