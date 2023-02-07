package house.jpashophse.repository;

import house.jpashophse.domain.Member;
import house.jpashophse.domain.Seller;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class SellerRepository {

    @PersistenceContext
    EntityManager em;

    public Long save(Seller seller){
        em.persist(seller);
        return seller.getId();
    }

    public Seller findOne(Long id){
        return em.find(Seller.class, id);
    }

    public List<Seller> findAll() {
        return em.createQuery("select s from Seller s", Seller.class).getResultList();
    }

    public List<Seller> findByName(String name){
        return em.createQuery("select s from Seller s where s.companyName = :name", Seller.class)
                .setParameter("name", name)
                .getResultList();
    }
}
