import { Fragment } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import styles from "./ItemCard.module.css";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);

function ItemCard(props) {
  return (
    <Fragment>
      <div className={cx("item-card-container", "rounded")}>
        <Image
          rounded
          className={cx("item-card-image")}
          src={props.mainImageUrl}
        />
      </div>

      <Card
        border="light"
        to={`/items/${props.id}`}
        as={NavLink}
        className={cx("item-card-text")}
      >
        <Card.Body>
          <Card.Subtitle className=" text-muted">
            {props.sellerName}
          </Card.Subtitle>
          <Card.Text>{props.name}</Card.Text>
          <Card.Title>{props.price}</Card.Title>
        </Card.Body>
      </Card>
    </Fragment>
  );
}

export default ItemCard;
