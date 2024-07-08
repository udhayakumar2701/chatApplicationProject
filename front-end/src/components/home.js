import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Row, Col, Button, Card, ListGroup, InputGroup, FormControl } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { IoSend, IoClose } from 'react-icons/io5';

const Home = () => {
    const [showProfile, setShowProfile] = useState(false);
    const [userData, setUserData] = useState([]); // State to hold user data array
    const [username, setUsername] = useState('');
    const location = useLocation(); 
    const [addNewProfile, setAddNewProfile] = useState(false);
    const [showMainContian, setShowMainContian] = useState(true);
    const [chatData, setChatData] = useState(null);
    const [friendId, setFriendId] = useState(''); // State to capture the friend ID input
    const [msg, setMessage] = useState('');

    useEffect(() => {
        if (location.state && location.state.userData) {
            setUserData(location.state.userData);
        }
        if (location.state && location.state.username) {
            setUsername(location.state.username);
        }
    }, [location]);

    const handleNewChat = async () => {
        console.log(username, friendId);
        try {
            const response = await axios.post(`http://localhost:8080/chat/addNewFriend`, {
                userId: username,
                frdId: friendId
            });
            console.log(response.data); // Handle response from backend as needed
        } catch (error) {
            alert(error.response.data);
            console.error('Error sending userId:', error);
        }
    };

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    const handleButtonClick = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/chat/specificUser?chatId=${userId}`);
            setShowMainContian(false);
            setAddNewProfile(false);
            setChatData(response.data);
            console.log("hello", chatData);
            console.log(response.data); // Handle response from backend as needed
        } catch (error) {
            console.error('Error sending userId:', error);
        }
    };

    const handleAddNew = () => {
        setAddNewProfile(!addNewProfile);
    };

    const handleSendMessage = async () => {
        // Logic to send the message
        // Don't send empty messages
        console.log(`Sending message: ${msg} to friend: ${friendId}`);
        // Reset message input after sending
        setMessage('');
    };

    const handleCloseChat = () => {
        setChatData(null);
        setShowMainContian(true);
    };

    return (
        <div>
            <header className='bg-light p-3'>
                <Container>
                    <Row className='align-items-center'>
                        <Col>
                            <Navbar expand="lg" className="justify-content-between">
                                <Navbar.Brand className='text-center'>Chat App</Navbar.Brand>
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
            <Container fluid className='mt-4'>
                <Row>
                    <Col md={4} className='p-3 bg-light' style={{ borderRight: '1px solid #ddd' }}>
                        <Card className='w-100' style={{ border: 'none' }}>
                            <Card.Body>
                                <Card.Title>Chats</Card.Title>
                                <ListGroup variant="flush">
                                    {userData.map((user) => (
                                        <ListGroup.Item
                                            key={user.id}
                                            action
                                            onClick={() => handleButtonClick(user.id)}
                                        >
                                            {user.userId === username
                                                ? `User: ${user.frdId}`
                                                : `User: ${user.userId}`}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                <Button onClick={handleAddNew}>Add new chat</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8} className='p-3'>
                        {!addNewProfile ? (
                            <div className='main-content'>
                                {showMainContian && (
                                    <div>
                                        <h5>Welcome to Chat App</h5>
                                        <p>Select a user to start chatting.</p>
                                    </div>
                                )}
                                
                                {chatData && (
                                    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', position: 'relative' }}>
                                        <Button
                                            onClick={handleCloseChat}
                                            style={{
                                                position: 'absolute',
                                                top: 10,
                                                right: 10,
                                                background: 'transparent',
                                                border: 'none',
                                                color: 'red',
                                                fontSize: '1.5rem',
                                            }}
                                        >
                                            <IoClose />
                                        </Button>
                                        {/* Iterate over the keys of the message object */}
                                        {Object.keys(chatData.message).map((friend) => (
                                            <div key={friend}>
                                                {friend !== username ? (
                                                    <>
                                                        <h2>{friend}</h2>
                                                        <ul>
                                                            {chatData.message[friend].map((message, index) => (
                                                                <li key={index} style={{ textAlign: 'left' }}>{message}</li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                ) : (
                                                    <>
                                                        <ul>
                                                            {chatData.message[friend].map((message, index) => (
                                                                <li key={index} style={{ textAlign: 'right' }}>{message}</li>
                                                            ))}
                                                        </ul>
                                                        <InputGroup className='mb-3'>
                                                            <FormControl
                                                                type='text'
                                                                placeholder='Send a message'
                                                                value={msg}
                                                                onChange={(e) => setMessage(e.target.value)}
                                                            />
                                                            <Button variant="primary" onClick={handleSendMessage}>
                                                                <IoSend />
                                                            </Button>
                                                        </InputGroup>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                <input
                                    type='text'
                                    placeholder='Enter Friend Id'
                                    className='mb-3'
                                    value={friendId}
                                    onChange={(e) => setFriendId(e.target.value)}
                                />
                                <Button onClick={() => handleNewChat(friendId)}>Add</Button>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
