import React, { useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import { Nav, Navbar } from 'react-bootstrap';
import Authentication from './components/authentication/Authentication'
import Events from './components/events/Events'
import Upload from './components/upload/Upload.js'

export default function Main() {
    const [bg, setBG] = useState('white')
    const [text, setText] = useState('#7269bf')
    const [light, setLight] = useState('dark')
    const [upload, setUpload] = useState(false)

    const lightMode = () => {
        if (light === 'light') {
            setBG('white')
            setText('#7269bf')
            setLight('dark')
        } else {
            setBG('#282c34')
            setText('white')
            setLight('light')
        }
    }

    return (
        <div className="main" style={{backgroundColor: bg}}>
            <Navbar bg="success" id="head">
                <Navbar.Brand onClick={() => setUpload(false)} style={{ marginLeft: '10px', color: bg }}>envirothon.study</Navbar.Brand>
                <Nav.Link onClick={() => setUpload(true)} style={{ color: bg}}>upload a question</Nav.Link>
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text style={{marginRight: '10px'}} onClick={lightMode}>{light}</Navbar.Text>
            </Navbar.Collapse>
            </Navbar>
            {!upload ?
                <div>
                    <Authentication text={text} />
                    <Events text={text} />
                </div>
                :
                <Upload />
            }
        </div>
    )
}
