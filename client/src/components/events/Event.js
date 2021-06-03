import React, { useState, useEffect } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import { Dropdown } from 'react-bootstrap'
import Header from '../header/Header'
import QuestionReal from './QuestionReal'

export default function Event(props) {
    const { themeBackground, themeText, themeVariant } = useTheme()
    const [questions, setQuestions] = useState([])
    const [load, setLoad] = useState(true)
    const [sort, setSort] = useState('newest-oldest')

    const getQuestions = async () => {
        await fetch(`/api/questions/category/${props.category}`)
            .then(response => response.json())
            .then(data => {
                setQuestions(data)
            })
    }

    const makeRecent = () => {
        setSort('newest-oldest')
        const temp = [...questions].sort((a, b) => {
            return parseInt(b.id) - parseInt(a.id)
        })
        setQuestions(temp)
    }

    const makeOld = () => {
        setSort('oldest-newest')
        const temp = [...questions].sort((a, b) => {
            return parseInt(a.id) - parseInt(b.id)
        })
        setQuestions(temp)
    }

    useEffect(() => {
        getQuestions()
    }, [])

    return (
        <div className="main" style={{backgroundColor: themeBackground, width: '100vw'}}>
            <Header />
            <div style={{ marginTop: '15px' }} className="d-flex justify-content-center align-items-center">
                <h3 style={{ color: themeText, textAlign: 'center' }}>{props.category} questions ({questions.length})</h3>
                <Dropdown style={{ marginLeft: '15px' }}>
                    <Dropdown.Toggle variant={themeVariant} id="dropdown-basic"><span style={{ color: themeBackground }}>{sort}</span></Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item style={{ color: themeText }} onClick={() => makeRecent()}>newest-oldest</Dropdown.Item>
                        <Dropdown.Item style={{ color: themeText }} onClick={() => makeOld()}>oldest-newest</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
                {questions.map((q, key) => {
                    return <div className="d-flex align-items-start">
                        <QuestionReal q={q} enabled={true} />
                    </div>
                })}
            </div>
        </div>
    )
}
