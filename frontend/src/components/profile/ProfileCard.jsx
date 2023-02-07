import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./ProfileCard.module.css";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);

function ProfileCard(props) {
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
                  {props.memberStatus}
                </Card.Subtitle>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default ProfileCard;
