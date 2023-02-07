package house.jpashophse.service;

import house.jpashophse.domain.Category;
import house.jpashophse.domain.CategoryItem;
import house.jpashophse.domain.Seller;
import house.jpashophse.domain.item.Item;
import house.jpashophse.repository.CategoryRepository;
import house.jpashophse.repository.ItemRepository;
import house.jpashophse.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;

    private final SellerRepository sellerRepository;

    @Transactional
    public Long createItem(Long sellerId, String name, int price, int stockQuantity, String description,String mainImageUrl, Long categoryId){

        // Read Entity
        Category category = categoryRepository.findOne(categoryId);
        Seller seller = sellerRepository.findOne(sellerId);

        // Create CategoryItem
        CategoryItem categoryItem = CategoryItem.createCategoryItem(category);
        // Create Item
        Item item = Item.createItem(seller,name, price, stockQuantity, description, mainImageUrl, categoryItem);

        // Save Item
        itemRepository.save(item);
        return item.getId();
    }

    @Transactional
    public Long updateItem(Long id, String name, int price, int stockQuantity, String description, String mainImageUrl)
    {
        // Read Entity
        Item item = itemRepository.findOne(id);
        item.setName(name);
        item.setPrice(price);
        item.setStockQuantity(stockQuantity);
        item.setDescription(description);
        item.setMainImageUrl(mainImageUrl);
        return item.getId();
    }

    public Item findOne(Long itemId){
        return itemRepository.findOne(itemId);
    }
}
