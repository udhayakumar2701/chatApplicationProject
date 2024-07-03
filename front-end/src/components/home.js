import React, { useState } from 'react';
import { Navbar, Nav, Container, Row, Col, Card } from 'react-bootstrap';

const Home = () => {
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div>
      <header className='bg-light p-3'>
        <Container>
          <Row className='align-items-center'>
            <Col>
              <Navbar expand="lg" className="justify-content-between">
                <Nav className="mx-auto">
                  <Navbar.Brand className='text-center'>Chat App</Navbar.Brand>
                </Nav>
                <Nav className="ml-auto">
                  <Nav.Link href="#" onClick={toggleProfile}>
                    <i className="bi bi-person-circle"></i> Profile
                  </Nav.Link>
                </Nav>
              </Navbar>
            </Col>
          </Row>
        </Container>
      </header>
      <Container className='mt-4'>
        <Row>
          <Col>
            <div>Content of your home page goes here...</div>
          </Col>
          {showProfile && (
            <Col md={3} className='d-flex flex-column align-items-end'>
              <Card className='w-100'>
                <Card.Body>
                  <Card.Title>User Details</Card.Title>
                  <Card.Text>Name: John Doe</Card.Text>
                  <Card.Text>Email: johndoe@example.com</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
