import { Fragment } from "react";
import CarouselExample from "../components/home/Carousel";
import Container from "react-bootstrap/Container";
import HomeCategoryList from "../components/home/HomeCategoryList";
import { TrendingItems } from "../components/home/TrendingItems";

export function Home() {
  return (
    <Fragment>
      <Container>
        <CarouselExample />

        <h3 className="my-4">Categories</h3>
        <HomeCategoryList />
        <h3 className="my-4">Trending Items</h3>
        <TrendingItems />
      </Container>
    </Fragment>
  );
}
