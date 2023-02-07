package house.jpashophse.repository;

import house.jpashophse.domain.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReviewRepository {

    private final EntityManager em;

    public void save(Review review){ em.persist(review);}

    public Review findOne(Long id){
        return em.find(Review.class, id);
    }

    public List<Review> findAll(int offset, int limit){
        return em.createQuery(
                "select r from Review r" +
                        " join fetch r.member m" +
                        " join fetch r.item i", Review.class)
                .setFirstResult(offset)
                .setMaxResults(limit)
                .getResultList();
    }

    public List<Review> findByItem(Long itemId){
        return em.createQuery(
                "select r from Review r" +
                        " join fetch r.member m" +
                        " join fetch r.item i" +
                        " where i.id = :item ", Review.class)
                .setParameter("item", itemId)
                .getResultList();
    }
}
