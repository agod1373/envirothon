import React, { useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const ThemeContext = React.createContext()

export function useTheme() {
    return useContext(ThemeContext)
}

export default function ThemeProvider({ children }) {
    const { currentUser } = useAuth()
    const themes = ['classic', 'dark', 'fog', 'alex', 'amelia', 'corrie', 'hannah', 'jackson']
    const themeBGs = ['white', '#282c34', '#7B7D7D', '#ffffed', '#D6EAF8', '#B03A2E', '#3F5216', '#F0B27A']
    const themeTexts = ['#023020', 'white', '#EAEDED', '#e1afe1', '#1F618D', '#EAEDED', '#907153', '#AF601A']
    const themeVariants = ['success', 'light', 'light', 'secondary', 'primary', 'light', 'info', 'warning']
    const [themeNumber, setThemeNumber] = useState(0)
    const [loading, setLoading] = useState(true)

    const changeTheme = async (n) => {
        setThemeNumber(n)
        try {
            await fetch(`/api/user/settheme/${n}/${currentUser.uid}`, {
                method: "PUT"
            })
                .then(response => response.json())
                .then(data => console.log(data))
        } catch (error) {
            return null
        }
        
    }

    const getDBTheme = async () => {
        try {
            await fetch(`/api/user/theme/${currentUser.uid}`)
                .then(response => response.json())
                .then(data => setThemeNumber(data))
                .then(setLoading(false))
        } catch (error) {
            return setLoading(false)
        }  
    }

    useEffect(() => {
        getDBTheme()
    }, [])

    const value = {
        changeTheme: changeTheme,
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
