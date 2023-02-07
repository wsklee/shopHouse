import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./ProfileCard.module.css";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);

function MyProfileCard(props) {
  let isSeller = props.authority === "ROLE_SELLER" && props.sellerId !== 0;
  let isAdmin = props.authority === "ROLE_ADMIN";

  return (
    <Row>
      <Col md={12} lg={6}>
        <Card>
          <Card.Body>
            <Row>
              <Col xs={4}>
                <Image
                  className={cx("profile-card-image")}
                  roundedCircle
                  src={props.profileImageUrl}
                  alt="Profile image"
                />
              </Col>
              <Col xs={8}>
                <Card.Title>{props.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {props.authority.slice(5)}
                </Card.Subtitle>

                <div className="d-flex gap-2">
                  <Button
                    variant="btn btn-outline-primary"
                    to={`/members/me/updateprofile`}
                    as={NavLink}
                  >
                    Update Profile
                  </Button>

                  {!isSeller && !isAdmin && (
                    <Button
                      variant="btn btn-outline-success"
                      to={`/sellers/signup`}
                      as={NavLink}
                      className="ml-3"
                    >
                      Sign Up to be a seller
                    </Button>
                  )}

                  {isSeller && (
                    <Button
                      variant="btn btn-outline-success"
                      to={`/sellers/me`}
                      as={NavLink}
                      className="ml-3"
                    >
                      Go to Seller Profile
                    </Button>
                  )}

                  {isAdmin && (
                    <Button
                      variant="btn btn-outline-success"
                      to={`/admin/category`}
                      as={NavLink}
                      className="ml-3"
                    >
                      Manage Category
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default MyProfileCard;
