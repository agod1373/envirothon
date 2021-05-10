import React, { useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import { Navbar } from 'react-bootstrap';
import Authentication from './components/authentication/Authentication'

export default function Main() {
    const [bg, setBG] = useState('white')
    const [light, setLight] = useState('dark');

    const lightMode = () => {
        if (light === 'light') {
            setBG('white')
            setLight('dark')
        } else {
            setBG('#282c34')
            setLight('light')
        }
    }

    return (
        <div className="main" style={{backgroundColor: bg}}>
            <Navbar bg="success" id="head">
                <Navbar.Brand style={{marginLeft: '10px', color: bg}}>envirothon.study</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text style={{marginRight: '10px'}} onClick={lightMode}>{light}</Navbar.Text>
            </Navbar.Collapse>
            </Navbar>
            <Authentication /> 
        </div>
    )
}
