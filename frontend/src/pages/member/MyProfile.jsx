import { Fragment } from "react";
import { Container } from "react-bootstrap";
import MyProfileCard from "../../components/profile/MyProfileCard";
import ProfileReviews from "../../components/profile/ProfileReviews";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

import { useGetLoggedInMemberQuery } from "../../api/extendedMemberApiSlice";

function MyProfile() {
  const {
    data: member,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLoggedInMemberQuery();

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
        <h3>Profile</h3>
        <MyProfileCard
          name={member.name}
          authority={member.authority}
          profileImageUrl={member.profileImageUrl}
          sellerId={member.sellerId}
        />
        <h3 className="my-4">My Orders</h3>

        <Button
          variant="btn btn-outline-primary"
          to={`/members/orders`}
          as={NavLink}
        >
          To my orders...
        </Button>
        <h3 className="my-4">Reviews</h3>
        <ProfileReviews reviews={member.reviews} />
      </Container>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <Fragment>{content}</Fragment>;
}

export default MyProfile;
