import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ItemInfoForm from "./ItemInfoForm";
import { NavLink } from "react-router-dom";
import styles from "./ItemInfo.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ItemInfo(props) {
  return (
    <Container>
      <Row xs={1} md={2}>
        <Col>
          <Image
            className={cx("item-info-image")}
            rounded
            src={props.mainImageUrl}
            alt="Item image"
          />
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <NavLink
                className=" text-muted"
                to={`/sellers/${props.sellerId}`}
              >
                {props.sellerName}
              </NavLink>
              <h2 className="fw-light">{props.name}</h2>
              <h1 className="fw-bold">{props.price}</h1>
            </Card.Body>
          </Card>
          <ItemInfoForm itemId={props.itemId} price={props.price} />
        </Col>
      </Row>
      <Row className="my-4">
        <Col>
          <Card>
            <Card.Body>
              <p className="fw-bold">Item Information</p>
              <p>{props.description}</p>
              <div>
                {props.categoryItems.map((categoryItem) => (
                  <h5 key={categoryItem.categoryId}>
                    <Badge pill bg="primary">
                      {`${categoryItem.categoryName}`}
                    </Badge>
                  </h5>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ItemInfo;
