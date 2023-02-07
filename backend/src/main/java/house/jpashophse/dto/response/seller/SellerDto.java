package house.jpashophse.dto.response.seller;

import house.jpashophse.domain.Seller;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class SellerDto {

    private Long sellerId;

    private String companyName;
    private String companyEmail;
    private String companyImageUrl;

    private List<SellerItemDto> items;

    public SellerDto(Seller seller){
        sellerId = seller.getId();
        companyName = seller.getCompanyName();
        companyEmail = seller.getCompanyEmail();
        companyImageUrl = seller.getCompanyImageUrl();
        items = seller.getItems().stream()
                .map(item -> new SellerItemDto(item))
                .collect(Collectors.toList());
    }
}
