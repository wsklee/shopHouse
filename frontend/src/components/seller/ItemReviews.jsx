import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import styles from "./ItemReviews.module.css";
import classNames from "classnames/bind";
import { Fragment } from "react";

const cx = classNames.bind(styles);

function ItemReviews(props) {
  let reviewsEmpty = !Array.isArray(props.reviews) || !props.reviews.length;
  let content;
  if (reviewsEmpty) {
    content = (
      <Container>
        <h2>Reviews</h2>
        <Card>
          <Card.Body>No reviews yet!</Card.Body>
        </Card>
      </Container>
    );
  } else {
    content = (
      <Container>
        <h2>Reviews</h2>
        {props.reviews.map((review) => (
          <Row className="mb-4" key={review.reviewId}>
            <Col>
              <Card>
                <Card.Header to={`/members/${review.memberId}`} as={NavLink}>
                  <Image
                    src={review.memberProfileImage}
                    roundedCircle
                    alt="Profile Image"
                    className={cx("profile-card-image")}
                    width="40"
                  />
                  <span className="text-uppercase">{`${review.memberId} : ${review.memberName}`}</span>
                </Card.Header>
                <Card.Body>
                  <p className="fw-bold">Rating : {review.rating}</p>
                  <p>{review.description}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    );
  }
  return <Fragment>{content}</Fragment>;
}

export default ItemReviews;
