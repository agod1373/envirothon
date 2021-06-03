import React from 'react'
import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player'
import { Card, Button } from 'react-bootstrap'

export default function Question(props) {

    return (
        <Card className="review-card" style={{ color: '#e1afe1', maxWidth: '600px', minHeight: '300px', color: props.themeText, backgroundColor: props.themeBackground, border: `4px solid ${props.themeText}` }}>
            <div className="review-meat">
                <h2 style={{ textAlign: 'center' }}><span style={{textDecoration: 'underline'}}>{props.question}</span></h2>
                {(props.url && props.fileType === 'image') && <img style={{ maxWidth: '350px', marginTop: '10px' }} src={props.url} alt="user uploaded image" />}
                {(props.url && props.fileType === 'audio') && <ReactAudioPlayer style={{ marginTop: '10px' }} src={props.url} controls />}
                {(props.url && props.fileType === 'video') && <ReactPlayer style={{ marginTop: '0px', maxWidth: '400px' }} url={props.url} controls />}
                <div style={{ width: '80%', marginBottom: '20px'}}>     
                </div>
            </div>
        </Card>
    )
}
