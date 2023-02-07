import { useParams } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import ItemCard from "../../components/shared/ItemCard";
import styles from "../../components/seller/SellerProfile.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

import { useGetSellerQuery } from "../../api/apiSlice";

function Seller() {
  let { sellerId } = useParams();
  const {
    data: seller,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSellerQuery(sellerId);

  let content;

  if (isLoading) {
    content = (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else if (isSuccess) {
    content = (
      <Container>
        <Row>
          <Col md={3}>
            <div className={cx("seller-profile-container", "rounded")}>
              <Image
                rounded
                className={cx("seller-profile-image")}
                src={seller.companyImageUrl}
              />
            </div>
            <h2>{seller.companyName}</h2>
            <p>{seller.items.length} Items</p>
          </Col>
          <Col md={1}></Col>
          <Col md={8}>
            <p className="fw-bold">Items</p>
            <Row xs={2} md={3} className="gx-4 gy-5">
              {seller.items.map((item) => (
                <Col key={item.itemId}>
                  <ItemCard
                    id={item.itemId}
                    key={item.itemId}
                    name={item.name}
                    price={item.price}
                    mainImageUrl={item.mainImageUrl}
                    sellerName={seller.companyName}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <div>{content}</div>;
}

export default Seller;
