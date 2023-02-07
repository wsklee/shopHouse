import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import ItemCard from "../shared/ItemCard";
import AlertExtraContent from "../shared/AlertExtraContent";

import { useGetItemsQuery } from "../../api/extendedItemApiSlice";

export const TrendingItems = () => {
  const {
    data: items,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetItemsQuery();

  let content;

  if (isLoading) {
    content = (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else if (isSuccess) {
    content = items.data.map((item) => (
      <Col key={item.id} xs={6} sm={3}>
        <ItemCard
          id={item.id}
          key={item.id}
          name={item.name}
          price={item.price}
          mainImageUrl={item.mainImageUrl}
          sellerName={item.sellerName}
        />
      </Col>
    ));
  } else if (isError) {
    content = (
      <Col xs={8}>
        <AlertExtraContent
          variant="danger"
          heading="Oh snap! You got an error!"
          content={error.error.toString()}
        />
      </Col>
    );
  }

  return <Row className="gx-4 gy-5">{content}</Row>;
};
