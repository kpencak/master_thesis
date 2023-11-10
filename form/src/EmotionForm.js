import React, { useState } from 'react';
import { Form, Row, Group, Col, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import "./EmotionForm.css";

const EmotionForm = () => {

    const [calm, setCalm] = useState([{
        author: "",
        title: "",
    }])

    const [happy, setHappy] = useState([{
        author: "",
        title: "",
    }])

    const [energetic, setEnergetic] = useState([{
        author: "",
        title: "",
    }])

    const [sad, setSad] = useState([{
        author: "",
        title: "",
    }])

    // const [fields, setFields] = useState([{
    //     gender: '',
    //     age: '',
    //     personality: ''
    // }])
    const [gender, setGender] = useState()

    const [age, setAge] = useState()

    const [personality, setPersonality] = useState()

    // const handleChange = (e) => {
    //     console.log(e.target.value);
    //     const values = [...fields]
    //     values[0][e.target.name] = e.target.value
    //     setFields(values)
    //     console.log(values)
    // }

    const handleChangeGender = (e) => {
        console.log(e.target.value);
        const value = e.target.value
        setGender(value)
        console.log(value)
    }

    const handleChangeAge = (e) => {
        console.log(e.target.value);
        const value = e.target.value
        setAge(value)
        console.log(value)
    }

    const handleChangePersonality = (e) => {
        console.log(e.target.value);
        const value = e.target.value
        setPersonality(value)
        console.log(value)
    }

    const handleChangeInputCalm = (i, e) => {
        console.log(e.target.value);
        const values = [...calm]
        values[i][e.target.name] = e.target.value
        setCalm(values)
    }

    const handleAddCalm = (i) => {
        setCalm([...calm, {author: '', title: ''}])
    }

    const handleRemoveCalm = (i) => {
        const values = [...calm]
        values.splice(i, 1)
        setCalm([...values])
    }

    const handleChangeInputHappy = (i, e) => {
        console.log(e.target.value);
        const values = [...happy]
        values[i][e.target.name] = e.target.value
        setHappy(values)
    }

    const handleAddHappy = (i) => {
        setHappy([...happy, {author: '', title: ''}])
    }

    const handleRemoveHappy = (i) => {
        const values = [...happy]
        values.splice(i, 1)
        setHappy([...values])
    }

    const handleChangeInputSad = (i, e) => {
        console.log(e.target.value);
        const values = [...sad]
        values[i][e.target.name] = e.target.value
        setSad(values)
    }

    const handleAddSad = (i) => {
        setSad([...sad, {author: '', title: ''}])
    }

    const handleRemoveSad = (i) => {
        const values = [...sad]
        values.splice(i, 1)
        setSad([...values])
    }

    const handleChangeInputEnergetic = (i, e) => {
        console.log(e.target.value);
        const values = [...energetic]
        values[i][e.target.name] = e.target.value
        setEnergetic(values)
    }

    const handleAddEnergetic = (i) => {
        setEnergetic([...energetic, {author: '', title: ''}])
    }

    const handleRemoveEnergetic = (i) => {
        const values = [...energetic]
        values.splice(i, 1)
        setEnergetic([...values])
    }

    const sendData = event => {
        event.preventDefault();
        fetch('/form', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Allow-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({calm: {...calm}, sad: {...sad}, happy: {...happy}, energetic: {...energetic}})
        })
            .then(response => response.json())
            .then(res => console.log(res))
    }

    return (
        <div>
            <Form onSubmit={sendData}>
                {/*<div className="divText"><u>Tell me something about yourself, but only if you want to</u></div>
                <Row className="formUser">
                    <Form.Group controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select required placeholder="Gender" name="gender" onChange={e => handleChangeGender(e)}>
                            <option>Choose your gender</option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                            <option value="other">other</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="age">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="number" placeholder="Age" name="age" onChange={e => handleChangeAge(e)}/>
                    </Form.Group>

                    <Form.Group controlId="personality">
                        <Form.Label>Personality Type</Form.Label>
                        <Form.Select onChange={e => handleChangePersonality(e)} name="personality">
                            <option value="">Choose your personality type</option>
                            <option value="INTJ-A/-T">INTJ-A/-T</option>
                            <option value="INTP-A/-T">INTP-A/-T</option>
                            <option value="ENTJ-A/-T">ENTJ-A/-T</option>
                            <option value="ENTP-A/-T">ENTP-A/-T</option>
                            <option value="INFJ-A/-T">INFJ-A/-T</option>
                            <option value="INFP-A/-T">INFP-A/-T</option>
                            <option value="ENFJ-A/-T">ENFJ-A/-T</option>
                            <option value="ENFP-A/-T">ENFP-A/-T</option>
                            <option value="ISTJ-A/-T">ISTJ-A/-T</option>
                            <option value="ISFJ-A/-T">ISFJ-A/-T</option>
                            <option value="ESTJ-A/-T">ESTJ-A/-T</option>
                            <option value="ESFJ-A/-T">ESFJ-A/-T</option>
                            <option value="ISTP-A/-T">ISTP-A/-T</option>
                            <option value="ISFP-A/-T">ISFP-A/-T</option>
                            <option value="ESTP-A/-T">ESTP-A/-T</option>
                            <option value="ESFP-A/-T">ESFP-A/-T</option>
                        </Form.Select>
                    </Form.Group>
                </Row>*/}

                <div className="divText"><u>Provide at least one song for each emotion</u></div>
                <Row className="formSongs">
                    <Form.Label className="divText">Songs that make you CALM</Form.Label>
                    <Form.Group controlId="calm">
                        {calm.map((field, i) => (
                            <Row className="form" key={field.id} md={3} xs={2}>
                                <Col className="form">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="ex. Elvis Presley"
                                        name="author"
                                        value={field.author}
                                        onChange={e => handleChangeInputCalm(i,e)}
                                    />
                                </Col>

                                <Col className="form">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="ex. Silent Night"
                                        name="title"
                                        value={field.title}
                                        onChange={e => handleChangeInputCalm(i,e)}
                                    />
                                </Col>

                                <Col style={{ "marginTop": 'auto' }}>
                                    <Button variant="outline-primary" size="md" onClick={() => handleAddCalm(i)}>Add</Button>{}
                                    <Button variant="outline-primary" size="md" disabled={i === 0} onClick={() => handleRemoveCalm(i)}>Remove</Button>
                                </Col>
                            </Row>
                        ))}
                    </Form.Group>

                    <Form.Label className="divText">Songs that make you SAD</Form.Label>
                    <Form.Group controlId="sad">
                        {sad.map((field, i) => (
                            <Row key={field.id} md={3} xs={2}>
                                <Col className="form">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="ex. Phil Collins"
                                        name="author"
                                        value={field.author}
                                        onChange={e => handleChangeInputSad(i,e)}
                                    />
                                </Col>

                                <Col className="form">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="ex. I Can't Stop Loving You"
                                        name="title"
                                        value={field.title}
                                        onChange={e => handleChangeInputSad(i,e)}
                                    />
                                </Col>

                                <Col style={{ "marginTop": 'auto' }}>
                                    <Button variant="outline-primary" size="md" onClick={() => handleAddSad(i)}>Add</Button>{}
                                    <Button variant="outline-primary" size="md" disabled={i === 0} onClick={() => handleRemoveSad(i)}>Remove</Button>
                                </Col>
                            </Row>
                        ))}
                    </Form.Group>


                    <Form.Label className="divText">Songs that make you ENERGETIC (both positively and negatively)</Form.Label>
                    <Form.Group controlId="energetic">
                        {energetic.map((field, i) => (
                            <Row key={field.id} md={3} xs={2}>
                                <Col className="form">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="ex. Kayne West"
                                        name="author"
                                        value={field.author}
                                        onChange={e => handleChangeInputEnergetic(i,e)}
                                    />
                                </Col>

                                <Col className="form">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="ex. Stronger"
                                        name="title"
                                        value={field.title}
                                        onChange={e => handleChangeInputEnergetic(i,e)}
                                    />
                                </Col>

                                <Col style={{ "marginTop": 'auto' }}>
                                    <Button variant="outline-primary" size="md" onClick={() => handleAddEnergetic(i)}>Add</Button>{}
                                    <Button variant="outline-primary" size="md" disabled={i === 0} onClick={() => handleRemoveEnergetic(i)}>Remove</Button>
                                </Col>
                            </Row>
                        ))}
                    </Form.Group>


                    <Form.Label className="divText">Songs that make you HAPPY</Form.Label>
                    <Form.Group controlId="happy">
                        {happy.map((field, i) => (
                            <Row key={field.id} md={3} xs={2}>
                                <Col className="form">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="ex. *NSYNC"
                                        name="author"
                                        value={field.author}
                                        onChange={e => handleChangeInputHappy(i,e)}
                                    />
                                </Col>

                                <Col className="form">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="ex. It's gonna be me"
                                        name="title"
                                        value={field.title}
                                        onChange={e => handleChangeInputHappy(i,e)}
                                    />
                                </Col>

                                <Col style={{ "marginTop": 'auto' }}>
                                    <Button variant="outline-primary" size="md" onClick={() => handleAddHappy(i)}>Add</Button>{}
                                    <Button variant="outline-primary" size="md" disabled={i === 0} onClick={() => handleRemoveHappy(i)}>Remove</Button>
                                </Col>
                            </Row>
                        ))}
                    </Form.Group>

                    <div style={{ "textAlign": "center", padding: "20px"}}>
                        <Button variant="primary" size="lg" type="submit">
                            Submit
                        </Button>
                    </div>
                </Row>
                </Form>
        </div>
    )
}

export default EmotionForm
