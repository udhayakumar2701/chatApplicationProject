import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [showProfile, setShowProfile] = useState(false);
    const [userData, setUserData] = useState([]); // State to hold user data array
    const [username, setUsername] = useState(''); 
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.userData) {
            setUserData(location.state.userData);
        }
        if (location.state && location.state.username) {
            setUsername(location.state.username);
        }
    }, [location]);

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };
   
    const handleButtonClick = async (userId) => {
        try {
          
            // Example of sending userId to a backend endpoint
            const response = await axios.get (`http://localhost:8080/chat/specificUser?userId=${userId}`);
            console.log(response.data); // Handle response from backend as needed
        } catch (error) {
            console.error('Error sending userId:', error);
        }
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
                    {userData.length > 0 && (
                        <Col md={12}>
                            <Card className='w-100' style={{ border: 'none' }}>
                                <Card.Body>
                                    <Card.Title>User Buttons</Card.Title>
                                    {userData.map((user) => (
                                        <Button
                                            key={user.id}
                                            variant="light"
                                            className="mb-2 d-block"
                                            style={{ border: 'none' }}
                                            onClick={() => handleButtonClick(user.id)}
                                        >
                                            {user.userId === username
                                                ? `User: ${user.frdId}`
                                                : `User: ${user.userId}`}
                                        </Button>
                                    ))}
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
