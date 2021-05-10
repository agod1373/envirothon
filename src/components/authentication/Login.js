import React, { useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export default function Login() {
    const [loading, setLoading] = useState(false);
    const emailRef = useRef()
    const passwordRef = useRef()

    return (
        <div>
            <Form className="d-flex justify-content-center">
                <Form.Group style={{marginRight: '10px'}} className="w-15">
                    <Form.Control type="email" placeholder="email" ref={emailRef} required/>
                </Form.Group>
                <Form.Group style={{marginRight: '10px'}} className="w-15">
                    <Form.Control type="password" placeholder="password" ref={passwordRef} required/>
                </Form.Group>
                <Button style={{color: 'white'}} disabled={loading} className="w-10" variant="success" type="submit">log in</Button>
            </Form>
        </div>
    )
}
