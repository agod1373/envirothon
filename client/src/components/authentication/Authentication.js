import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Nav } from 'react-bootstrap'
import Profile from './Profile'
import Login from './Login'
import Signup from './Signup'

export default function Authentication(props) {
    const { currentUser } = useAuth();
    const [mode, setMode] = useState('login');

    if (currentUser) {
        return <Profile text={props.text} />
    }

    return (
        <div>
            <Nav style={{margin: '10px 0px'}} variant="pills" defaultActiveKey="link-1" className="justify-content-center">
                <Nav.Item onClick={() => setMode('login')}>
                    <Nav.Link eventKey="link-1">login</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => setMode('signup')}>
                    <Nav.Link eventKey="link-2">signup</Nav.Link>
                </Nav.Item>
            </Nav>
            {mode === 'login' ? <Login /> : <Signup />}
        </div>
    )
}
