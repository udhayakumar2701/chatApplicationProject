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
    const [showMainContainer, setShowMainContainer] = useState(true);
    const [chatData, setChatData] = useState(null);
    const [friendId, setFriendId] = useState(''); // State to capture the friend ID input
    const [msg, setMessage] = useState('');
    const [liveChatFrdName ,setlivechatFrd]=useState('');
    const [getChatWithID,setChatWithID]=useState(false);
    const [getChat, setGetChat] = useState({
        userId: '',
        frdName: ''
    });

    useEffect(() => {
        let interval='';
        if(getChatWithID){
            console.log("Interval"+getChat.userId)
             interval = setInterval(async() => {
            try {
                const response = await axios.get(`http://localhost:8080/chat/specificUser?chatId=${getChat.userId}`);
                setShowMainContainer(false);
                setAddNewProfile(false);
                setlivechatFrd(getChat.frdName);
                setChatData(response.data);
                console.log(response.data); // Handle response from backend as needed
            } catch (error) {
                console.error('Error sending userId:', error);
            }
        }, 1000)

     }; return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [getChatWithID, getChat.userId,getChat.frdName]);

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
            handleAfterNewFrdAdd(username);
            console.log(response.data); // Handle response from backend as needed
        } catch (error) {
            alert(error.response.data);
            console.error('Error sending userId:', error);
        }
    };

    const handleAfterNewFrdAdd =async(userId)=>{
        try {
            const response = await axios.post(`http://localhost:8080/chat/fetchUserDetials/${userId}`
            );
            setUserData(response.data);
            console.log(response.data); // Handle response from backend as needed
        } catch (error) {
            alert(error.response.data);
            console.error('Error sending userId:', error);
        }
        return;
    };

    const toggleProfile = () => {
        setChatWithID(false);

        setShowProfile(!showProfile);
    };

    const handleButtonClick = async (userId,frdName) => {
        try {
            console.log(userId+frdName);
            setChatWithID(true);
            setGetChat({userId:userId,frdName:frdName});
            const response = await axios.get(`http://localhost:8080/chat/specificUser?chatId=${userId}`);
            setShowMainContainer(false);
            setAddNewProfile(false);
            setlivechatFrd(frdName);
            setChatData(response.data);
            console.log(response.data); // Handle response from backend as needed
        } catch (error) {
            console.error('Error sending userId:', error);
        }
    };

    const handleAddNew = () => {
        setChatWithID(false);

        setAddNewProfile(!addNewProfile);
    };

    const handleSendMessage = async () => {
        if (!msg.trim()) return; // Don't send empty messages
        console.log(`Sending message: ${msg} to friend: ${friendId}`);
        try {
            const response = await axios.post('http://localhost:8080/chat/send', {
                chatId: chatData.frdsEntityId,
                senderId: username,
                senderMessage: msg
            });
            setChatData(response.data);
            console.log(response.data);
        } catch (error) {
            alert(error.response.data);
        }
        setMessage(''); // Reset message input after sending
    };

    const handleCloseChat = () => {
        setChatWithID(false);
        setChatData(null);
        setShowMainContainer(true);
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
                    <Col md={4} className='p-3' style={{ borderRight: '1px solid #ddd', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                        <Card className='w-100 shadow'>
                            <Card.Body>
                                <Card.Title>Chats</Card.Title>
                                <ListGroup variant="flush">
                                    {userData.map((user) => (
                                        <ListGroup.Item
                                            key={user.id}
                                            action
                                            onClick={() => handleButtonClick(user.id,(username!==user.frdId)?user.frdId:user.userId)}
                                            className="rounded-pill mb-2"
                                            style={{ cursor: 'pointer', backgroundColor: '#e9ecef' }}
                                        >
                                            {user.userId.toUpperCase() === username.toUpperCase()
                                                ? ` ${user.frdId}`
                                                : ` ${user.userId}`}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                                <Button onClick={handleAddNew} className="mt-3 " variant="info">Add new chat</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8} className='p-3'>
                        {!addNewProfile ? (
                            <div className='main-content'>
                                {showMainContainer && (
                                    <div>
                                        <h5>Welcome to Chat App</h5>
                                        <p>Select a user to start chatting.</p>
                                    </div>
                                )}
                                {chatData && (
                                    <div className='p-5' style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', position: 'relative' }}>
                                        <h2>{liveChatFrdName}</h2>
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
                                        <div>
                                            {chatData.message.map((message, index) => (
                                                
                                                <div key={index} className='' style={{textAlign:(message.userId.toUpperCase() !== username.toUpperCase()) ?  'left'  :  "right" }}>
                                                   
                                                    <p >{message.message}</p>
                                                </div>
                                                
                                            ))}
                                        </div>
                                        <InputGroup className='mb-3 mt-3'>
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
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div>
                                <input
                                    type='text'
                                    placeholder='Enter Friend Id'
                                    className='mb-3 bg-body-secondary'
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
