import React, { useRef, useState } from 'react'
import { GoogleLoginButton } from "react-social-login-buttons";
import { useAuth } from '../../contexts/AuthContext'
import { Form, Button, Alert, Spinner } from 'react-bootstrap'

export default function Login() {
    const { signup, googleSignup } = useAuth();
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState('')
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlert('')
        setLoading(true)

        if (passwordRef.current.value.length < 6) {
            setLoading(false)
            return setAlert('please enter a password that is 6 or more characters')
        }

        try {
            await signup(emailRef.current.value, passwordRef.current.value)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setAlert('email already in use')
        }

    }

    const google = async () => {
        setLoading(true);

        try {
            await googleSignup();
        } catch (error) {
            setAlert('failed to sign in with google. please try again.')
        }

        setLoading(false);
    }

    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            
            {alert && <Alert style={{width: '300px', textAlign: 'center'}} variant="danger">{alert}</Alert>}
            {loading ?
                <Spinner animation="border" variant="success" />
            :
            <div>
                <GoogleLoginButton style={{ width: '300px', margin: '10px auto'}} onClick={google} className="google-auth-button" variant="primary">log in with google</GoogleLoginButton>
                <Form onSubmit={handleSubmit} style={{ marginTop: '-10px' }} className="d-flex justify-content-center flex-wrap">
                    <Form.Group style={{marginRight: '10px', marginTop: '10px'}} className="w-15">
                        <Form.Control type="email" placeholder="email" ref={emailRef} required/>
                    </Form.Group>
                    <Form.Group style={{marginRight: '10px', marginTop: '10px'}} className="w-15">
                        <Form.Control type="password" placeholder="password" ref={passwordRef} required/>
                    </Form.Group>
                    <Button disabled={loading} style={{color: 'white', marginTop: '10px'}} disabled={loading} className="w-10" variant="success" type="submit">sign up</Button>
                </Form>
            </div>
            }
        </div>
    )
}
