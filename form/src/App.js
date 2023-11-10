import React, { Component } from "react";
import "./App.css";
import EmotionForm from "./EmotionForm";
import sad_lisa from './images/sad_lisa.gif';
import enter from './images/enter_meme.gif';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends Component {

    render() {
        return (
            <div className="App">
                <Navbar className="nav" expand="lg" sticky="top">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#about">About</Nav.Link>
                                <Nav.Link href="#form">Form</Nav.Link>
                                <Nav.Link href="#contact">Contact</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Container fluid id="content">
                    <section id="about" className="intro">
                        <Row>
                            <Col>
                                <p>
                                    <h1>Hi! <br/></h1>

                                    My name is Kasia and I need <b>your</b> help!
                                    {/*My name is Kate and I'm currently studying on my last year at AGH*/}
                                    {/*UST. If you're here, you probably know that I'm writing my Master's*/}
                                    {/*thesis in Computer Science and I need <b>your</b> help.*/}
                                </p>
                            </Col>
                        </Row>
                        <Row style={{ background: '#D7E3FC'}}>
                            <Col>
                                <img src={sad_lisa} alt="Sad Lisa"/>
                            </Col>
                            <Col lg={true}>
                                <p>
                                    Imagine yourself in the passenger seat of the car. It's grey and
                                    gloomy outside the window and you are listening to the song flowing
                                    from your headphones with your eyes fixed on the distance. If
                                    someone looked at you, he wouldn't have noticed anything out of
                                    normal, but you're far away from here. You know exactly what the
                                    singer tried to say through their song and the lyrics are hitting
                                    straight through your heart. You are playing the main role in their
                                    music video .
                                </p>
                            </Col>
                        </Row>
                        <Row style={{ background: '#ABC4FF'}}>
                            <Col>
                            <p>
                                Suddenly, the song is over and you hear the beginning of 'Despacito'.
                                Or, which is worse, 'Shake it off'.
                            </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p>
                                    Cruelly pulled from the distant
                                    world, you change songs only to be more irritated. 'Who let the dogs
                                    out', 'Macarena', 'Mambo no. 5'... <br/> <br/>

                                    You only want to listen to another <s>sad</s> ekhem... moving song!

                                    I get it. I really do. <br/>
                                    We've all been there.
                                </p>
                            </Col>
                        </Row>
                        <Row style={{ background: '#D7E3FC'}}>
                            <Col>
                                <p>
                                    That is why I want to create an application that based on your mood
                                    and currently listening track will create <b>your own, personalized
                                    queue</b> which won't misbehave as described earlier and could affect
                                    your emotions, in result changing your mood. Sounds cool?
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={true}>
                                <p>
                                    And bang! That's the moment when you appear all dressed in white with a thin mist dancing around your ankles!
                                </p>
                            </Col>
                            <Col>
                                <img src={enter} alt="Hello bitches"/>
                            </Col>
                        </Row>

                        <Row style={{ background: '#CCDBFD'}}>
                            <Col>
                            <p>
                                To be able to develop such solution I need YOUR HELP in creation of
                                database which will become a training set for my machine learning
                                model. That is why I will be more than happy if you fill the form
                                below by <b>providing songs that make you feel exact emotions</b>.
                                If you also provide <b>your age or personality type</b> I'll be able
                                to analyze if there's some relation between those data and the way
                                that we all perceive emotions during listening to music.
                            </p>
                            </Col>
                        </Row>
                    </section>
                    <section id="form">
                        <EmotionForm/>
                    </section>
                    <section id="contact">
                        <Row style={{ background: '#D7E3FC'}}>
                            <Col>
                                <p>
                                    Thank you so much in advance and if you have any questions you can
                                    write me an email here: 297272@student.agh.edu.pl
                                </p>
                            </Col>
                        </Row>
                    </section>
                </Container>
            </div>
        );
    }
}

export default App;
