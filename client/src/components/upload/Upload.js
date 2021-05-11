import React, { useState } from 'react'
import { useAuth } from '../../contexts/ThemeContext'
import { useTheme } from '../../contexts/ThemeContext'
import { Form, Button, Spinner, OverlayTrigger, Popover, Alert, Card } from 'react-bootstrap'
import Header from '../header/Header'
import './Upload.scss'

export default function Upload() {
    const { themeBackground, themeText } = useTheme()
    const [answerCount, setAnswerCount] = useState(2)
    const [loading, setLoading] = useState(false)
    const [review, setReview] = useState(false)
    const [alert, setAlert] = useState('')
    const [error, setError] = useState('')

    const [q, setQ] = useState('')
    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [c, setC] = useState('')
    const [d, setD] = useState('')
    const [e, setE] = useState('')
    const [answer, setAnswer] = useState('A')

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

    const submitQuestion = async (e) => {
        e.preventDefault()
        setLoading(true)
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

    if (loading) {
        return (
            <div>
                <Header />
                <div className="d-flex justify-content-center">
                    <Spinner style={{marginTop: '150px'}} animation="border" variant="success" />
                </div>
            </div>
        )
    }

    if (review) {
        return (
            <div className="main">
                <Header />
                <Card className="review-card" style={{color: themeText}}>
                    <h2 style={{ textDecoration: 'underline' }}>{q}</h2>
                    <h3>Answer: {answer}</h3>
                    <div style={{ width: '70%'}}>
                        <h3>(a) {a}</h3>
                        <h3>(b) {b}</h3>
                        {c && <h3>(c) {c}</h3>}
                        {d && <h3>(d) {d}</h3>}
                        {e && <h3>(e) {e}</h3>}
                    </div>
                    <Button onClick={(e) => submitQuestion} variant="success">Submit</Button>
                </Card>
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
            {alert && <Alert style={{textAlign: 'center', width: '300px', margin: '0px auto'}} variant="success">{alert}</Alert>}
            {error && <Alert style={{textAlign: 'center', width: '300px', margin: '0px auto'}} variant="danger">{error}</Alert>}
            <Form onSubmit={() => setReview(true)} style={{ marginTop: '20px', color: themeText }} className="upload-form">
                <Form.Group className="w-75">
                    <Form.Control value={q} onChange={(e) => setQ(e.target.value)} as="textarea" rows={3} placeHolder="enter question here" required />
                </Form.Group>
                <Form.Group style={{ marginTop: '20px', marginBottom: '20px'}}>
                    <Form.Label>upload image, audio, or video (optional)</Form.Label>
                    <Form.File id="exampleFormControlFile1" label="" />
                </Form.Group>
                <div className="answer-buttons">
                    <Form.Label style={{marginRight: '15px'}}>answers ({answerCount})</Form.Label>
                    <Form.Label onClick={increment} style={{ verticalAlign: 'middle', fontSize: '30px', color: '#AFE1AF', cursor: 'pointer', marginRight: '10px' }}>+</Form.Label>
                    <Form.Label onClick={decrement} style={{ verticalAlign: 'middle', fontSize: '30px', color: '#cf554c', cursor: 'pointer' }}>-</Form.Label>
                </div>
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
                    <Form.Label>Choice A</Form.Label>
                    <Form.Control value={a} onChange={(e) => setA(e.target.value)} type="text" placeHolder="first answer" required/>
                </Form.Group>
                <Form.Group className="w-75">
                    <Form.Label>Choice B</Form.Label>
                    <Form.Control value={b} onChange={(e) => setB(e.target.value)} type="text" placeHolder="second answer" required/>
                </Form.Group >
                {(answerCount >= 3) && <Form.Group className="w-75">
                    <Form.Label>Choice C</Form.Label>
                    <Form.Control value={c} onChange={(e) => setC(e.target.value)} type="text" placeHolder="third answer" />
                </Form.Group>}
                {(answerCount >= 4) && <Form.Group className="w-75">
                    <Form.Label>Choice D</Form.Label>
                    <Form.Control value={d} onChange={(e) => setD(e.target.value)} type="text" placeHolder="fourth answer" />
                </Form.Group>}
                {(answerCount >= 5) && <Form.Group className="w-75">
                    <Form.Label>Choice E</Form.Label>
                    <Form.Control value={e} onChange={(e) => setE(e.target.value)}type="text" placeHolder="fifth answer" />
                </Form.Group>}
                <Button style={{marginTop: '15px', marginBottom: '20px'}} type="submit" variant="success">Review & Submit</Button>
            </Form>
        </div>
    )
}
