import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";
import AlertExtraContent from "../../components/shared/AlertExtraContent";
import AddCategoryForm from "../../components/category/AddCategoryForm";

import {
  useGetCategorysQuery,
  useDeleteCategoryMutation,
} from "../../api/extendedCategoryApiSlice";

export const CategoryList = () => {
  const {
    data: categorys,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategorysQuery();

  const [
    deleteCategory,
    {
      isError: isErrorDelete,
      isLoading: isLoadingDelete,
      isSuccess: isSuccessDelete,
    },
  ] = useDeleteCategoryMutation();

  const onDeleteCategory = async (categoryId) => {
    try {
      const payload = await deleteCategory(categoryId).unwrap();
    } catch (err) {
      console.error("Delete category Error: ", err);
    }
  };

  let content;
  let categoryList;

  if (isLoading) {
    content = (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else if (isSuccess) {
    categoryList = categorys.data.map((category) => (
      <Row key={category.id} className="gx-2 mb-2">
        <Col md={2}>{category.id}</Col>
        <Col md={4}>{category.name}</Col>
        <Col md={6}>
          <ButtonGroup aria-label="Basic example">
            <Button
              variant="btn btn-outline-secondary"
              to={`/category/${category.id}`}
              as={NavLink}
            >
              View Items
            </Button>
            <Button
              variant="btn btn-outline-secondary"
              to={`/admin/category/${category.id}`}
              as={NavLink}
              className="ml-3"
            >
              Update
            </Button>
            <Button
              variant="danger"
              onClick={() => onDeleteCategory(category.id)}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    ));
    content = (
      <Fragment>
        <AddCategoryForm />
        <div className="mt-5">{categoryList}</div>
      </Fragment>
    );
  } else if (isError) {
    content = (
      <Row>
        <Col xs={8}>
          <AlertExtraContent
            variant="danger"
            heading="Oh snap! You got an error!"
            content={error.error.toString()}
          />
        </Col>
      </Row>
    );
  }

  return (
    <Container>
      <h1>Admin Page</h1>
      <h3>Manage Categories</h3>
      {content}
    </Container>
  );
};

export default CategoryList;
