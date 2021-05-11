import React, { useContext, useState, useEffect } from 'react'

const ThemeContext = React.createContext()

export function useTheme() {
    return useContext(ThemeContext)
}

export default function ThemeProvider({ children }) {
    const themes = ['celadon', 'dark']
    const themeBGs = ['white', '#282c34']
    const themeTexts = ['#e1afe1', 'white']
    const [themeNumber, setThemeNumber] = useState(0)
    const [loading, setLoading] = useState(false)

    function changeTheme(number) {
        sessionStorage.setItem('number', number)
        return setThemeNumber(number)
    }

    useEffect(() => {
        if (sessionStorage.getItem('number')) {
            setThemeNumber(sessionStorage.getItem('number'))
        }
    })

    const value = {
        changeTheme,
        themeNumber: themeNumber,
        themes: themes,
        themeBGs: themeBGs,
        themeTexts: themeTexts,
        themeName: themes[themeNumber],
        themeBackground: themeBGs[themeNumber],
        themeText: themeTexts[themeNumber]
    }

    return (
        <ThemeContext.Provider value={value}>
            {!loading && children}
        </ThemeContext.Provider>
    )
}
