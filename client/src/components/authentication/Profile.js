import React, { useState, useRef } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { Form, Button } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'

export default function Profile(props) {
    const { currentUser, updateDisplayName, logout } = useAuth()
    const { themeText, themeBackground, themeVariant } = useTheme()
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState('')
    const [editUN, setEditUN] = useState(false)

    const usernameRef = useRef();

    const updateUsername = async e => {
        e.preventDefault();
        setAlert('')
        setLoading(true)

        if (usernameRef.current.value.length < 3) {
            setLoading(false)
            return setAlert('username must be three or more characters long')
        }
        
        try {
            await updateDisplayName(usernameRef.current.value);
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setAlert('username already taken')
        }

    }

    return (
        <div className="d-flex justify-content-center">
            {!currentUser.displayName ?
            <div>
                    <h4 style={{ color: themeText}}>account successfully created! before proceeding, please enter a username</h4>
                <Form onSubmit={updateUsername} className="d-flex justify-content-center align-items-center">
                    <Form.Group style={{marginRight: '10px'}}>
                        <Form.Control type="text" ref={usernameRef} placeholder='username' />
                    </Form.Group>
                    <Button style={{ color: 'white' }} type="submit" variant="success">submit</Button>
                </Form>
            </div>
                :
            <div>
                <p style={{ color: themeText, verticalAlign: 'middle'}}><span style={{ fontSize: '30px', marginRight: '10px' }}>user</span> {currentUser.displayName} 
                    <span style={{ marginLeft: '15px', textDecoration: 'underline', cursor: 'pointer' }}>edit</span></p>
                <Button onClick={logout} style={{ color: themeBackground }} variant={themeVariant}>log out</Button>
            </div>
            }
        </div>
    )
}
