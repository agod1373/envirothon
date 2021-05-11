import React from 'react'
import { useTheme } from './contexts/ThemeContext'
import Header from './components/header/Header'
import Authentication from './components/authentication/Authentication'
import Events from './components/events/Events'

export default function Main() {
    const { themeBackground } = useTheme();

    return (
        <div className="main" style={{backgroundColor: themeBackground}}>
            <Header />
            <Authentication />
            <Events />
        </div>
    )
}
