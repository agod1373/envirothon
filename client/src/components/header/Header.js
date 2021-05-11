import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

export default function Header() {
    const { changeTheme, themeNumber, themes, themeBGs, themeTexts, themeName, themeBackground, themeText } = useTheme();

    return (
        <Navbar bg="success" variant="dark" expand="sm">
            <Navbar.Brand style={{ marginLeft: '10px', color: themeBackground}}><Link style={{color: themeBackground,textDecoration: 'none'}} to="/">envirothon.study</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav.Link style={{ color: themeBackground}}><Link style={{color: themeBackground,textDecoration: 'none'}} to="/upload">upload a question</Link></Nav.Link>
            <NavDropdown id="basic-nav-dropdown" variant="success" className="justify-content-end" style={{marginRight: '30px', width: '80px'}} title={<span style={{color: themeBackground}}>{themeName}</span>}>
                {themes.map((t, key) => {
                    if (key != themeNumber) {
                        return <NavDropdown.Item onClick={() => changeTheme(key)} style={{color: themeTexts[key], backgroundColor: themeBGs[key]}}>{t}</NavDropdown.Item>
                    }
                })}
            </NavDropdown>
            </Navbar.Collapse>
        </Navbar>
    )
}
