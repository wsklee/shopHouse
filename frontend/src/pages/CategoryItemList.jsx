import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import ItemCard from "../components/shared/ItemCard";
import AlertExtraContent from "../components/shared/AlertExtraContent";
import { Fragment } from "react";

import { useParams } from "react-router-dom";
import { useGetItemsOfCategoryQuery } from "../api/extendedCategoryApiSlice";

function CategoryItemList() {
  const { categoryId } = useParams();
  const {
    data: categoryItems,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetItemsOfCategoryQuery(categoryId);

  let content;
  let mappedItemList;
  let itemListLength;

  if (isLoading) {
    content = (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else if (isSuccess) {
    itemListLength = categoryItems.itemList.length;
    mappedItemList = categoryItems.itemList.map((item) => (
      <Col key={item.id}>
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
    content = (
      <Fragment>
        <Col md={3}>
          <h1>{categoryItems.categoryName} </h1>
          <p>{`${itemListLength} ${itemListLength > 1 ? "items" : "item"}`}</p>
        </Col>
        <Col md={9}>
          <p className="fw-bold">Items</p>
          <Row xs={2} md={3} className="gx-4 gy-5">
            {mappedItemList}
          </Row>
        </Col>
      </Fragment>
    );
  } else if (isError) {
    content = (
      <Col>
        <AlertExtraContent
          variant="danger"
          heading="Oh snap! You got an error!"
          content={error.error ? error.error.toString() : "Error occurred"}
        />
      </Col>
    );
  }

  return (
    <Container>
      <Row>{content}</Row>
    </Container>
  );
}

export default CategoryItemList;
