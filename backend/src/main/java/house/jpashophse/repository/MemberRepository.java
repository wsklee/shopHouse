package house.jpashophse.repository;

import house.jpashophse.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MemberRepository {

    @PersistenceContext
    EntityManager em;

    public Member save(Member member){
        em.persist(member);
        return member;
    }

    public Member findOne(Long id){
        return em.find(Member.class, id);
    }

    public List<Member> findAll() {
        return em.createQuery("select m from Member m", Member.class).getResultList();
    }

    public List<Member> findByName(String name){
        return em.createQuery("select m from Member m where m.name = :name", Member.class)
                .setParameter("name", name)
                .getResultList();
    }

    public Optional<Member> findByEmail(String email){
        return em.createQuery("select m from Member m where m.email = :email", Member.class)
                .setParameter("email", email)
                .getResultStream().findFirst();
    }

    public boolean existsByEmail(String email) {
        Optional<Member> findMember = findByEmail(email);
        return (findMember.isPresent());
    }
}
