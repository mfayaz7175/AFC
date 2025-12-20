import React from 'react';
import { Carousel, Container, Row, Col, Card } from 'react-bootstrap';
import "./style/style.css";
import "./style/themify-icons.css";

const reviews = [
  {
    quote: "AFC offers a secure and innovative platform that makes managing digital assets effortless. The integration with MetaMask is flawless.",
    name: "Aaron Ballance",
    title: "CEO, AFC",
    image: "/img/review/1.jpg"
  },
  {
    quote: "The advanced smart contract features of AFC, including minting and account controls, set a new standard for cryptocurrency.",
    name: "Jackson Nash",
    title: "CTO, AFC",
    image: "/img/review/2.jpg"
  },
  {
    quote: "With a robust ecosystem built on Hardhat and Solidity, AFC is not just a token—it’s a step towards a decentralized financial future.",
    name: "Katy Abrams",
    title: "Product Manager, AFC",
    image: "/img/review/3.jpg"
  }
];

const Review = () => {
  return (
    <section className="review-section">
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12}>
            <Carousel
              indicators={true}
              controls={true}
              fade
              interval={5000}
              prevIcon={<span className="carousel-control-prev-icon fas fa-chevron-left"></span>}
              nextIcon={<span className="carousel-control-next-icon fas fa-chevron-right"></span>}
            >
              {reviews.map((review, index) => (
                <Carousel.Item key={index}>
                  <div className="review-slide d-flex align-items-center justify-content-center">
                    <Card className="review-card text-center border-0">
                      <Card.Body>
                        <blockquote className="blockquote">
                          <p className="mb-4 review-quote">"{review.quote}"</p>
                        </blockquote>
                        <div className="review-author d-flex flex-column align-items-center">
                          <div className="author-avatar mb-3">
                            <img src={review.image} alt={review.name} className="rounded-circle" />
                          </div>
                          <h5 className="mb-0 review-name">{review.name}</h5>
                          <small className="review-title">{review.title}</small>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Review;
