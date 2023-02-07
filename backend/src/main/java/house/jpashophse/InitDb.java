package house.jpashophse;

import house.jpashophse.controller.AuthController;
import house.jpashophse.domain.*;
import house.jpashophse.domain.item.Item;
import house.jpashophse.dto.request.member.CreateMemberRequest;
import house.jpashophse.repository.MemberRepository;
import house.jpashophse.service.ItemService;
import house.jpashophse.service.ReviewService;
import house.jpashophse.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class InitDb {

    private final InitService initService;

    @PostConstruct
    public void init() {
        initService.dbInitAdmin();
        initService.dbInitSeller();
        initService.dbInitCategory();
        initService.dbInit1();
        initService.dbInit2();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {
        private final EntityManager em;
        private final ItemService itemService;
        private final SellerService sellerService;

        private final ReviewService reviewService;

        private final AuthController authController;
        private final MemberRepository memberRepository;

        private final PasswordEncoder passwordEncoder;

        public void dbInitAdmin(){
            // Init admin
            createAdmin("Admin","https://assets.website-files.com/5e51c674258ffe10d286d30a/5e535da9550b762cb4f909a6_peep-103.png","admin@yomail.com","1q2w3e4r","Seoul", "Seoul", "11111" );
        }

        public void dbInitSeller(){
            // Init member who is also seller
            createMember("sellerA","https://assets.website-files.com/5e51c674258ffe10d286d30a/5e535741f5fa1a13a1f8f233_peep-48.png","sellerA@yomail.com","1q2w3e4r","Paris", "Montaigne", "11167" );
            Optional<Member> findMember = memberRepository.findByEmail("sellerA@yomail.com");
            if(findMember.isPresent()){
                sellerService.createSeller(findMember.get().getId(), "LoveFurniture", "lovefurniture@yomail.com", "https://images.unsplash.com/photo-1501183638710-841dd1904471?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80");
            }

            // Init Seller 2
            createMember("sellerB","https://assets.website-files.com/5e51c674258ffe10d286d30a/5e53536a9588e087617bd93c_peep-23.png","sellerB@yomail.com","1q2w3e4r","Busan", "Busan", "22222" );
            Optional<Member> findMember2 = memberRepository.findByEmail("sellerB@yomail.com");
            if(findMember2.isPresent()){
                sellerService.createSeller(findMember2.get().getId(), "HomeInterior", "homeinterior@yomail.com", "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80");
            }
        }

        public void dbInitCategory(){
            // Init Category
            Category sofa = Category.createCategory("Sofa");
            em.persist(sofa);
            Category bed = Category.createCategory("Bed");
            em.persist(bed);
            Category wooden = Category.createCategory("Wooden");
            em.persist(wooden);
            Category fabric = Category.createCategory("Fabric");
            em.persist(fabric);
            Category plastic = Category.createCategory("Plastic");
            em.persist(plastic);

            // Init CategoryItem
            CategoryItem sofaItem = CategoryItem.createCategoryItem(sofa);
            em.persist(sofaItem);
            CategoryItem bedItem = CategoryItem.createCategoryItem(bed);
            em.persist(bedItem);
            CategoryItem woodenItem = CategoryItem.createCategoryItem(wooden);
            em.persist(woodenItem);
            CategoryItem fabricItem = CategoryItem.createCategoryItem(fabric);
            em.persist(fabricItem);
            CategoryItem plasticItem = CategoryItem.createCategoryItem(plastic);
            em.persist(plasticItem);

            // Find a seller
            Seller seller = sellerService.findOne(3L);
            Seller seller2 = sellerService.findOne(5L);

            // Init Item
            Item item1 = Item.createItem(seller,"AdamsSOFA", 20000, 100,"Cuddle up in the comfortable AdamsSOFA. The generous size invites you and your guests to many hours of socialising and relaxation.","https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", sofaItem, fabricItem);
            em.persist(item1);

            Item item2 = Item.createItem(seller, "AdamsBED", 40000, 100,"Bring a cosy feeling into your bedroom. Relax and chill.","https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80", bedItem);
            em.persist(item2);
            Item item3 = Item.createItem(seller, "AdamsCHAIR", 15000, 100,"An easy match with different tables and rooms, anywhere and everywhere.","https://images.unsplash.com/photo-1517705008128-361805f42e86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80", plasticItem);
            em.persist(item3);
            Item item4 = Item.createItem(seller2, "BettySOFA", 10000, 100,"Enjoy long movie nights and comfy socialising with friends in BettySOFA","https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80", fabricItem);
            em.persist(item4);
            Item item5 = Item.createItem(seller2, "BettyBED", 30000, 100, "Sleep tight in BettyBed. Sheets woven with finest fabric.","https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80", woodenItem);
            em.persist(item5);
            Item item6 = Item.createItem(seller2, "BettyCHAIR", 16000, 100, "A comfy chair that’s sturdy, yet lightweight and stackable too.","https://images.unsplash.com/photo-1576528418822-5ddc2568621b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80", plasticItem);
            em.persist(item6);


        }

        public void dbInit1() {
            // Init member
            createMember("userA", "https://assets.website-files.com/5e51c674258ffe10d286d30a/5e535741f5fa1a13a1f8f233_peep-48.png","userA@yomail.com", "1q2w3e4r","Seoul", "Sejong", "55555");
            Optional<Member> findMember = memberRepository.findByEmail("userA@yomail.com");

            Item item1 = itemService.findOne(16L);
            Item item2 = itemService.findOne(17L);


            OrderItem orderItem1 = OrderItem.createOrderItem(item1, 20000, 2);
            OrderItem orderItem2 = OrderItem.createOrderItem(item2, 40000, 4);
            List<OrderItem> orderItemList = new ArrayList<>();
            orderItemList.add(orderItem1);
            orderItemList.add(orderItem2);
            Order order = Order.createOrder(findMember.get(), createDelivery(findMember.get()), orderItemList);
            em.persist(order);
            reviewService.createReview(findMember.get().getId(), item1.getId(), "Great sofa for its price! Highly recommend", 4);
            reviewService.createReview(findMember.get().getId(), item2.getId(), "Bed is comfortable. A bit small though", 3);
        }

        public void dbInit2() {
            createMember("userB","https://assets.website-files.com/5e51c674258ffe10d286d30a/5e5353362b568a99fd167467_peep-21.png","userB@yomail.com", "1q2w3e4r", "Tokyo", "Asakusa", "22222");
            Optional<Member> findMember = memberRepository.findByEmail("userB@yomail.com");
            Item item1 = itemService.findOne(19L);
            Item item2 = itemService.findOne(20L);


            OrderItem orderItem1 = OrderItem.createOrderItem(item1, 10000, 1);
            OrderItem orderItem2 = OrderItem.createOrderItem(item2, 30000, 3);
            List<OrderItem> orderItemList = new ArrayList<>();
            orderItemList.add(orderItem1);
            orderItemList.add(orderItem2);
            Order order = Order.createOrder(findMember.get(), createDelivery(findMember.get()), orderItemList);
            em.persist(order);
            reviewService.createReview(findMember.get().getId(), item1.getId(), "Sofa is comfortable. Size is big enough", 4);
            reviewService.createReview(findMember.get().getId(), item2.getId(), "Great bed! Size is perfect for me", 5);
        }

        private void createMember(String name, String profileImageUrl, String email, String password, String city, String street, String zipcode) {
            // Init CreateMemberRequest
            CreateMemberRequest createMemberRequest = new CreateMemberRequest();
            createMemberRequest.setName(name);
            createMemberRequest.setEmail(email);
            createMemberRequest.setPassword(password);
            createMemberRequest.setCity(city);
            createMemberRequest.setStreet(street);
            createMemberRequest.setZipcode(zipcode);
            createMemberRequest.setProfileImageUrl(profileImageUrl);
            authController.signup(createMemberRequest);
        }

        private void createAdmin(String name, String profileImageUrl, String email, String password, String city, String street, String zipcode) {
            Member member = new Member();
            member.setEmail(email);
            member.setPassword(passwordEncoder.encode(password));
            member.setAuthority(Authority.ROLE_ADMIN);
            member.setName(name);
            member.setProfileImageUrl(profileImageUrl);
            member.setAddress(new Address(city, street, zipcode));
            memberRepository.save(member);
        }

        private Delivery createDelivery(Member member) {
            Delivery delivery = new Delivery();
            delivery.setAddress(member.getAddress());
            delivery.setStatus(DeliveryStatus.READY);
            return delivery;
        }


    }
}
