import React, { useContext, useState, useEffect } from 'react'

const ThemeContext = React.createContext()

export function useTheme() {
    return useContext(ThemeContext)
}

export default function ThemeProvider({ children }) {
    const themes = ['classic', 'dark', 'fog', 'alex', 'amelia', 'jackson', 'corrie', 'hannah']
    const themeBGs = ['white', '#282c34', '#7B7D7D', '#ffffed', '#D6EAF8', '#F0B27A', '#B03A2E', '#0B5345']
    const themeTexts = ['#023020', 'white', '#EAEDED', '#e1afe1', '#1F618D', '#AF601A', '#EAEDED', '#D7BDE2']
    const themeVariants = ['success', 'success', 'light', 'secondary', 'primary', 'warning', 'light', 'info']
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
    }, [])

    const value = {
        changeTheme,
        themeNumber: themeNumber,
        themes: themes,
        themeBGs: themeBGs,
        themeTexts: themeTexts,
        themeVariants: themeVariants,
        themeName: themes[themeNumber],
        themeBackground: themeBGs[themeNumber],
        themeText: themeTexts[themeNumber],
        themeVariant: themeVariants[themeNumber]
    }

    return (
        <ThemeContext.Provider value={value}>
            {!loading && children}
        </ThemeContext.Provider>
    )
}
