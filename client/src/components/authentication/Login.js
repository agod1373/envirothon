import React, { useRef, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Form, Button, Alert, Spinner } from 'react-bootstrap'

export default function Login() {
    const { login } = useAuth();
    
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState('')
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleLogin = async e => {
        e.preventDefault()
    
        try {
            setLoading(true)
            setAlert('')
            await login(emailRef.current.value, passwordRef.current.value)
        } catch (error) {
            setAlert('invalid email/password combination')
        }

        setLoading(false)
    }

    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            {alert && <Alert className="mx-auto" style={{ width: '300px' }} variant="danger">{alert}</Alert>}
            {loading ?
                <Spinner animation="border" variant="success" />
                :
                <Form onSubmit={handleLogin} className="d-flex justify-content-center">
                    <Form.Group style={{ marginRight: '10px' }} className="w-15">
                        <Form.Control type="email" placeholder="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group style={{ marginRight: '10px' }} className="w-15">
                        <Form.Control type="password" placeholder="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button style={{ color: 'white' }} disabled={loading} className="w-10" variant="success" type="submit">log in</Button>
                </Form>
            }
        </div>
    )
}
