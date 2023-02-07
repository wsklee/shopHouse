import Carousel from "react-bootstrap/Carousel";
import { Image } from "react-bootstrap";
import "./Carousel.css";

function CarouselExample() {
  return (
    <Carousel>
      <Carousel.Item className="carousel-item">
        <Image
          className="carousel-image"
          src="/carousel-image-1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Sofa sales</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <Image
          className="carousel-image"
          src="/carousel-image-2.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Bed sales</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className="carousel-item">
        <Image
          className="carousel-image"
          src="/carousel-image-3.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Chair sales</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselExample;
