import { Fragment } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";

function ProfileReviews(props) {
  return (
    <Fragment>
      {props.reviews.map((review) => (
        <Row className="mb-4" key={review.reviewId}>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title to={`/items/${review.itemId}`} as={NavLink}>
                  {review.itemName}
                </Card.Title>
                <p>Rating : {review.rating}</p>
                <p>{review.description}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Fragment>
  );
}

export default ProfileReviews;
