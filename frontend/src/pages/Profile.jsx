import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import ProfileCard from "../components/profile/ProfileCard";
import ProfileReviews from "../components/profile/ProfileReviews";
import Spinner from "react-bootstrap/Spinner";

import { useGetMemberQuery } from "../api/extendedMemberApiSlice";

function Profile() {
  let { memberId } = useParams();
  const {
    data: member,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMemberQuery(memberId);

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
        <ProfileCard
          memberId={memberId}
          name={member.name}
          memberStatus={member.memberStatus}
          profileImageUrl={member.profileImageUrl}
        />

        <h3 className="my-4">Reviews</h3>
        <ProfileReviews reviews={member.reviews} />
      </Container>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <Fragment>{content}</Fragment>;
}

export default Profile;
