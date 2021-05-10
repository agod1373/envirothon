import React, { useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export default function Login() {
    const [loading, setLoading] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    return (
        <div>
            <Form style={{marginTop: '-10px'}} className="d-flex justify-content-center flex-wrap">
                <Form.Group style={{marginRight: '10px', marginTop: '10px'}} className="w-15">
                    <Form.Control type="email" placeholder="email" ref={emailRef} required/>
                </Form.Group>
                <Form.Group style={{marginRight: '10px', marginTop: '10px'}} className="w-15">
                    <Form.Control type="password" placeholder="password" ref={passwordRef} required/>
                </Form.Group>
                <Form.Group style={{marginRight: '10px', marginTop: '10px'}} className="w-15">
                    <Form.Control type="password" placeholder="confirm password" ref={passwordConfirmRef} required/>
                </Form.Group>
                <Button style={{color: 'white', marginTop: '10px'}} disabled={loading} className="w-10" variant="success" type="submit">sign up</Button>
            </Form>
        </div>
    )
}
