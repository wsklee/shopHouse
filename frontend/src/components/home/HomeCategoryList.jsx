import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import AlertExtraContent from "../shared/AlertExtraContent";
import { Link } from "react-router-dom";
import styles from "./HomeCategoryList.module.css";

import { useGetCategorysQuery } from "../../api/extendedCategoryApiSlice";

function HomeCategoryList() {
  const {
    data: categorys,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategorysQuery();

  let content;

  if (isLoading) {
    content = (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else if (isSuccess) {
    content = categorys.data.slice(0, 5).map((category) => (
      <Col key={category.id}>
        <Link className={styles.categorylink} to={`/category/${category.id}`}>
          {category.name}
        </Link>
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

  return (
    <Container>
      <Row>{content}</Row>
    </Container>
  );
}

export default HomeCategoryList;
