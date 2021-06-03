import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player'
import { Card, Button, Form } from 'react-bootstrap'
import './Question.scss'

export default function QuestionReal(props) {
    const { themeBackground, themeText, themeVariant } = useTheme()
    const [answers, setAnswers] = useState(props.q.answers.split(','))
    const [selected, setSelected] = useState()

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
                                        style={{marginRight: '10px'}}
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
            <div className="question-main">
                <Card.Subtitle className="mb-2 text-muted">
                    <div className="d-flex justify-content-between">
                        <span style={{ color: themeText }}>{props.q.username}</span>
                        
                        <span style={{ color: themeText }}>{props.q.date.slice(0, 10)}</span>
                    </div>
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted"><span style={{ color: themeText }}>{props.q.category} #{props.q.id}</span></Card.Subtitle>
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
                                    style={{marginRight: '10px'}}
                                    onClick={() => setSelected(key)}
                                    required
                                />
                            )  
                    })}
                    </Form.Group>
                    <div className="d-flex justify-content-center"><Button type="submit" style={{ color: themeBackground, marginTop: '10px' }} variant={themeVariant}>answer</Button></div>
                </Form>
            </div>
        </Card>
    )
}
