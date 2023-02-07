import { Fragment } from "react";
import { useParams } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";
import ItemInfo from "../../components/seller/ItemInfo";
import ItemReviews from "../../components/seller/ItemReviews";
import AlertExtraContent from "../../components/shared/AlertExtraContent";

import { useGetItemQuery } from "../../api/extendedItemApiSlice";

function Item() {
  let { itemId } = useParams();
  const {
    data: item,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetItemQuery(itemId);

  let content;

  if (isLoading) {
    content = (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else if (isSuccess) {
    content = (
      <Fragment>
        <ItemInfo
          itemId={itemId}
          sellerId={item.sellerId}
          mainImageUrl={item.mainImageUrl}
          name={item.name}
          sellerName={item.sellerName}
          price={item.price}
          description={item.description}
          categoryItems={item.categoryItems}
        />
        <ItemReviews reviews={item.reviews} />
      </Fragment>
    );
  } else if (isError) {
    content = (
      <AlertExtraContent
        variant="danger"
        heading="Oh snap! You got an error!"
        content={error.toString()}
      />
    );
  }

  return <div>{content}</div>;
}

export default Item;
