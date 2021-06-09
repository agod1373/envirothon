import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player'
import { Card, Button, Form } from 'react-bootstrap'
import './Question.scss'

export default function QuestionReal(props) {
    const { themeBackground, themeText, themeVariant } = useTheme()
    const { currentUser } = useAuth()
    const [answers, setAnswers] = useState(props.q.answers.split(','))
    const [answerText, setAnswerText] = useState()
    const [selected, setSelected] = useState()
    const [answered, setAnswered] = useState(false)
    const [checkmark, setCheckmark] = useState(false)
    const [answerLog, setAnswerLog] = useState([])
    const [loading, setLoading] = useState(true)

    const getAnswerInfo = async () => {
        await fetch(`/api/answerlog/${props.q.id}/${currentUser.uid}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setAnswerLog(data)
                setLoading(false)
        })
    }

    const answerFunction = async e => {
        e.preventDefault()
        setAnswered(true)
        const answersArray = ['A', 'B', 'C', 'D', 'E']
        const answer = answersArray[selected]
        setAnswerText(answers[answersArray.indexOf(props.q.answer)])
        if (answer === props.q.answer) {
            setCheckmark(true)
        }
        const j = `{
            "questionId": "${props.q.id}",
            "respondentUsername": "${currentUser.displayName}",
            "respondentUid": "${currentUser.uid}",
            "respondentAnswer": "${answer}",
            "correct": "${answer === props.q.answer}"
        }`
        console.log(j)
        await fetch('/api/answer', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: j
        }).then(response => console.log(response))
    }

    useEffect(() => {
        getAnswerInfo()
    }, [])

    if (!props.enabled) {
        return (
            <Card className="question-card" style={{ color: themeText, backgroundColor: themeBackground, border: `4px solid ${themeText}` }}>
                <div className="question-main">
                    <Card.Subtitle className="mb-2 text-muted">
                        <div className="d-flex justify-content-between">
                            <span style={{ color: themeText }}>{props.q.username}</span>
                            
                            <span style={{ color: themeText }}>{props.q.date.slice(0, 10)}</span>
                        </div>
                    </Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted"><span style={{ color: themeText }}>{props.q.category}</span></Card.Subtitle>
                    <Card.Title style={{ fontSize: '20px' }}>{props.q.question}</Card.Title>
                    {(props.q.file && props.q.filetype === 'image') && <img style={{ maxWidth: '350px', marginTop: '10px' }} src={props.q.file} alt="user uploaded image" />}
                    {(props.q.file && props.q.filetype === 'audio') && <ReactAudioPlayer style={{ marginTop: '10px' }} src={props.q.file} controls />}
                    {(props.q.file && props.q.filetype === 'video') && <ReactPlayer style={{ marginTop: '0px', maxWidth: '400px' }} url={props.q.file} controls />}
                    <Form onSubmit={(e) => console.log('test')}>
                        <Form.Group>
                            {props.q.answers.split(',').map((a, key) => {
                                return (
                                    <Form.Check
                                        type="radio"
                                        label={a}
                                        name="formHorizontalRadios"
                                        id={a + key}
                                        style={{ marginRight: '10px' }}
                                    />
                                )  
                            })}
                        </Form.Group>
                        <div className="d-flex justify-content-center"><Link to={`${props.q.category}`}><Button style={{ color: themeBackground, marginTop: '10px' }} variant={themeVariant}>answer now</Button></Link></div>
                    </Form>
               </div>
            </Card>
        )
    }

    return (
        <Card className="question-card" style={{ color: themeText, backgroundColor: themeBackground, border: `4px solid ${themeText}` }}>
            {!answered && <div className="question-main">
                <Card.Subtitle className="mb-2 text-muted">
                    <div className="d-flex justify-content-between">
                        <span style={{ color: themeText }}>{props.q.username}</span>
                        
                        <span style={{ color: themeText }}>{props.q.date.slice(0, 10)}</span>
                    </div>
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted"><span style={{ color: themeText }}>{props.q.category} #{props.q.id}</span></Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted"><span style={{ color: themeText }}>{answerLog.length > 0 &&
                    <div>Answered {answerLog[answerLog.length - 1].correct ? 'correctly' : 'incorrectly'} on {answerLog[answerLog.length - 1].date.substring(0, 10)}</div>}</span></Card.Subtitle>
                <Card.Title style={{ fontSize: '20px' }}>{props.q.question}</Card.Title>
                {(props.q.file && props.q.filetype === 'image') && <img style={{ maxWidth: '350px', marginTop: '10px' }} src={props.q.file} alt="user uploaded image" />}
                {(props.q.file && props.q.filetype === 'audio') && <ReactAudioPlayer style={{ marginTop: '10px' }} src={props.q.file} controls />}
                {(props.q.file && props.q.filetype === 'video') && <ReactPlayer style={{ marginTop: '0px', maxWidth: '400px' }} url={props.q.file} controls />}
                <Form onSubmit={(e) => answerFunction(e)}>
                    <Form.Group>
                        {props.q.answers.split(',').map((a, key) => {
                            return (
                                <Form.Check
                                    type="radio"
                                    label={a}
                                    name="formHorizontalRadios"
                                    id={a + key}
                                    style={{ marginRight: '10px' }}
                                    onClick={() => setSelected(key)}
                                    required
                                />
                            )
                        })}
                    </Form.Group>
                    <div className="d-flex justify-content-center"><Button type="submit" style={{ color: themeBackground, marginTop: '10px' }} variant={themeVariant}>answer</Button></div>
                </Form>
            </div>}
            {answered && 
                <div className="question-main">
                    {checkmark &&
                        <div>
                            <Card.Title style={{ fontSize: '20px' }}>Correct!</Card.Title>
                            <svg style={{ boxShadow: `inset 0px 0px 0px ${themeText}` }} className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle style={{ stroke: themeText }} className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                            <p>{props.q.explanation ? 'Explanation: ' + props.q.explanation : 'no explanation available'}</p>       
                            <p>Question Log:</p>
                            <p>Answered correctly just now</p>
                            {answerLog.reverse().map((l, key) => {
                                return <div>
                                    Answered {l.correct ? 'correctly' : 'incorrectly'} on {l.date.substring(0, 10)}
                                </div>
                            })}          
                         </div>
                    }
                    {!checkmark && 
                        <div>
                            <Card.Title style={{ fontSize: '20px' }}>Incorrect</Card.Title>
                            <Card.Body>
                                <p>Correct Answer: ({props.q.answer}) {answerText}</p>
                                <p>{props.q.explanation ? 'Explanation: ' + props.q.explanation : 'no explanation available'}</p>
                                <p style={{ margin: '0px !important', padding: '0px !important'}}>Question Log:</p>
                                <p>Answered incorrectly just now</p>
                                {answerLog.reverse().map((l, key) => {
                                    return <p id="question-p">
                                        Answered {l.correct ? 'correctly' : 'incorrectly'} on {l.date.substring(0, 10)}
                                    </p>
                                })}
                                </Card.Body>
                        </div>
                }
                </div>
            }
        </Card>
    )
}
