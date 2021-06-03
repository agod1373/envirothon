import React, { useState } from 'react'
import app from '../../firebase.js'
import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { Form, Button, Spinner, OverlayTrigger, Popover, Alert, Card, Dropdown } from 'react-bootstrap'
import Header from '../header/Header'
import './Upload.scss'

export default function Upload() {
    const { currentUser } = useAuth()
    const { themeBackground, themeText, themeVariant } = useTheme()
    const [answerCount, setAnswerCount] = useState(4)
    const [loading, setLoading] = useState(false)
    const [review, setReview] = useState(false)
    const [alert, setAlert] = useState('')
    const [error, setError] = useState('')

    const [category, setCategory] = useState('Soils')
    const [q, setQ] = useState('')
    const [url, setUrl] = useState('')
    const [type, setType] = useState('')
    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [c, setC] = useState('')
    const [d, setD] = useState('')
    const [e, setE] = useState('')
    const [answer, setAnswer] = useState('A')
    const [explanation, setExplanation] = useState('')

    const increment = () => {
        if (answerCount < 5) {
            setAnswerCount(answerCount + 1)
        }
    }

    const decrement = () => {
        if (answerCount > 2) {
            setAnswerCount(answerCount - 1)
        }
    }

    const cont = (e) => {
        e.preventDefault()
        if ((answer.toLowerCase().charCodeAt(0) - 96) > answerCount) {
            return setError('Please choose an answer')
        }
        setReview(true)
    }

    const uploadPicture = async (e) => {
        try {
            const file = e.target.files[0];
            setType(file.type.substring(0, 5))
            const storageRef = app.storage().ref();
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            const uploadedURL = await fileRef.getDownloadURL();
            setUrl(uploadedURL);
        } catch (error) {
            return setError('upload failed. make sure you are logged in.');
        }
    }

    const submitQuestion = async (event) => {
        event.preventDefault()
        setLoading(true)

        const answersArray = [a, b, c, d, e]

        const j = `{
            "username": "${currentUser.displayName}",
            "uid": "${currentUser.uid}",
            "question": "${q}",
            "answers": "${answersArray.slice(0, answerCount)}",
            "answer": "${answer}",
            "file": "${url}",
            "category": "${category}",
            "accepted": false,
            "explanation": "${explanation}"
        }`

        try {
            await fetch('/api/postquestion', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: j
            })
            setQ('')
            setUrl('')
            setType('')
            setAnswerCount(4)
            setA('')
            setB('')
            setC('')
            setD('')
            setE('')
            setExplanation('')
            setAnswer('A')
            setLoading(false)
            setReview(false)
            return setAlert('Successfully submitted question for review.')
        } catch (err) {
            setLoading(false)
            setReview(false)
            return setError('Failed to submit question. Please try again.')
        }

    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Question Upload</Popover.Title>
          <Popover.Content>
            Choose category, enter details, and submit. 
            Once an admin approves your question, the whole world 
            will be able to see and answer it.
          </Popover.Content>
        </Popover>
      );
    
    if (review) {
        return (
            <div className="main" style={{color: themeText, backgroundColor: themeBackground}}>
                <Header />
                <Card className="review-card" style={{ color: '#e1afe1', maxWidth: '600px', minHeight: '300px', color: themeText, backgroundColor: themeBackground, border: `4px solid ${themeText}` }}>
                    {loading ? <Spinner style={{ marginTop: '50px' }} animation="border" variant={themeVariant} /> 
                        :
                    <div className="review-meat">
                    <h2 style={{ textAlign: 'center' }}>({category}) <span style={{textDecoration: 'underline'}}>{q}</span></h2>
                    {(url && type === 'image') && <img style={{ maxWidth: '350px', marginTop: '10px' }} src={url} alt="user uploaded image" />}
                    {(url && type === 'audio') && <ReactAudioPlayer style={{ marginTop: '10px' }} src={url} controls />}
                    {(url && type === 'video') && <ReactPlayer style={{ marginTop: '0px', maxWidth: '400px' }} url={url} controls />}
                    <h3>Answer: {answer}</h3>
                    <div style={{ width: '80%', marginBottom: '20px'}}>
                        <h4>(a) {a}</h4>
                        <h4>(b) {b}</h4>
                        {c && <h4>(c) {c}</h4>}
                        {d && <h4>(d) {d}</h4>}
                        {e && <h4>(e) {e}</h4>}
                        {explanation && <h5>* {explanation}</h5>}    
                    </div>
                    <div className="d-flex">
                        <Button onClick={() => setReview(false)} style={{ marginBottom: '10px', marginRight: '15px', width: '80px', color: 'white' }} variant="danger">Edit</Button>
                        <Button style={{ marginBottom: '10px', width: '80px', color: themeBackground }} onClick={(event) => submitQuestion(event)} variant={themeVariant}>Submit</Button>
                    </div>
                    </div>
                    }
                </Card>
            </div>
            
        )
    }

    if (loading) {
        return (
            <div>
                <Header />
                <div className="d-flex justify-content-center">
                    <Spinner style={{marginTop: '135px'}} animation="border" variant={themeVariant} />
                </div>
            </div>
        )
    }

    return (
        <div className="main" style={{backgroundColor: themeBackground, width: '100vw'}}>
            <Header />
            <div className="d-flex justify-content-center" style={{ color: themeText, marginTop: '10px' }}>
                <h3>upload a question</h3>
                <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                    <h3 style={{marginLeft: '15px', cursor: 'pointer'}}>?</h3>
                </OverlayTrigger>
            </div>
            {alert && <Alert style={{textAlign: 'center', width: '300px', margin: '0px auto'}} variant={themeVariant}>{alert}</Alert>}
            {error && <Alert style={{textAlign: 'center', width: '300px', margin: '0px auto'}} variant="danger">{error}</Alert>}
            <Form onSubmit={(e) => cont(e)} style={{ marginTop: '15px', color: themeText }} className="upload-form">
                <Dropdown style={{ marginBottom: '15px' }}>
                    <Dropdown.Toggle variant={themeVariant} id="dropdown-basic"><span style={{ color: themeBackground }}>{category}</span></Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item style={{ color: themeText }} onClick={() => setCategory('Soils')}>Soils</Dropdown.Item>
                        <Dropdown.Item style={{ color: themeText }} onClick={() => setCategory('Aquatics')}>Aquatics</Dropdown.Item>
                        <Dropdown.Item style={{ color: themeText }} onClick={() => setCategory('Forestry')}>Forestry</Dropdown.Item>
                        <Dropdown.Item style={{ color: themeText }} onClick={() => setCategory('Wildlife')}>Wildlife</Dropdown.Item>
                        <Dropdown.Item style={{ color: themeText }} onClick={() => setCategory('General Knowledge')}>General Knowledge</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Group className="w-75">
                    <Form.Label>Question</Form.Label>
                    <Form.Control value={q} onChange={(e) => setQ(e.target.value)} as="textarea" rows={2} placeHolder="enter question here" required />
                </Form.Group>
                <Form.Group style={{ marginTop: '20px', marginBottom: '20px'}}>
                    <Form.Label>upload image, audio, or video (optional)</Form.Label>
                    <Form.File type="file" label="" onChange={(e) => uploadPicture(e)} />
                    {(url && type === 'image') && <img style={{ maxWidth: '350px', marginTop: '10px' }} src={url} alt="user uploaded image" />}
                    {(url && type === 'audio') && <ReactAudioPlayer style={{ marginTop: '10px' }} src={url} controls />}
                    {(url && type === 'video') && <ReactPlayer style={{ marginTop: '10px' }} url={url} controls />}
                </Form.Group>
                <div className="answer-buttons">
                    <Form.Label style={{marginRight: '15px'}}>answers ({answerCount})</Form.Label>
                    <Form.Label onClick={increment} style={{ verticalAlign: 'middle', fontSize: '30px', color: '#AFE1AF', cursor: 'pointer', marginRight: '10px' }}>+</Form.Label>
                    <Form.Label onClick={decrement} style={{ verticalAlign: 'middle', fontSize: '30px', color: '#cf554c', cursor: 'pointer' }}>-</Form.Label>
                </div>
                <Form.Group className="w-75">
                    <Form.Label>Choice A</Form.Label>
                    <Form.Control value={a} onChange={(e) => setA(e.target.value)} type="text" placeHolder="first answer" required/>
                </Form.Group>
                <Form.Group className="w-75">
                    <Form.Label>Choice B</Form.Label>
                    <Form.Control value={b} onChange={(e) => setB(e.target.value)} type="text" placeHolder="second answer" required/>
                </Form.Group >
                {(answerCount >= 3) && <Form.Group className="w-75">
                    <Form.Label>Choice C</Form.Label>
                    <Form.Control value={c} onChange={(e) => setC(e.target.value)} type="text" placeHolder="third answer" required />
                </Form.Group>}
                {(answerCount >= 4) && <Form.Group className="w-75">
                    <Form.Label>Choice D</Form.Label>
                    <Form.Control value={d} onChange={(e) => setD(e.target.value)} type="text" placeHolder="fourth answer" required/>
                </Form.Group>}
                {(answerCount >= 5) && <Form.Group className="w-75">
                    <Form.Label>Choice E</Form.Label>
                    <Form.Control value={e} onChange={(e) => setE(e.target.value)}type="text" placeHolder="fifth answer" required/>
                </Form.Group>}
                <Form.Group>
                <Form.Label>Correct Answer</Form.Label>
                <div className="d-flex w-75 align-items-left">
                    <Form.Check
                    type="radio"
                    label="A"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    style={{marginRight: '10px'}}
                    onClick={() => setAnswer('A')}
                    checked={answer === 'A'}
                    required
                    />
                    <Form.Check
                    type="radio"
                    label="B"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    style={{marginRight: '10px'}}
                    onClick={() => setAnswer('B')}
                    checked={answer === 'B'}
                    />
                    {(answerCount >= 3) && <Form.Check
                    type="radio"
                    label="C"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                    style={{marginRight: '10px'}}
                    onClick={() => setAnswer('C')}
                    checked={answer === 'C'}
                    />}
                    {(answerCount >= 4) && <Form.Check
                    type="radio"
                    label="D"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                    style={{marginRight: '10px'}}
                    onClick={() => setAnswer('D')}
                    checked={answer === 'D'}
                    />}
                    {(answerCount >= 5) && <Form.Check
                    type="radio"
                    label="E"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                    style={{marginRight: '10px'}}
                    onClick={() => setAnswer('E')}
                    checked={answer === 'E'}
                    />}
                    </div>
                </Form.Group>
                <Form.Group className="w-75">
                    <Form.Label>Explanation (optional)</Form.Label>
                    <Form.Control value={explanation} onChange={(e) => setExplanation(e.target.value)} as="textarea" rows={3} placeHolder="enter explanation here" />
                </Form.Group>
                <Button style={{marginTop: '15px', marginBottom: '20px', color: themeBackground }} type="submit" variant={themeVariant}>Review & Submit</Button>
            </Form>
        </div>
    )
}
