import React, { useState, useEffect } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import Soils from '../../images/soils.svg'
import Aquatics from '../../images/aquatics.svg'
import Forestry from '../../images/forestry.svg'
import Wildlife from '../../images/wildlife.svg'
import General from '../../images/general.svg'
import './Events.scss'

export default function Events() {
    const { themeText } = useTheme()
    const [counts, setCounts] = useState([0, 0, 0, 0, 0])

    const getCounts = async () => {
        const counts = await fetch(`/api/questioncounts`)
        const countsJSON = await counts.json();
        let temp = countsJSON.map(c => c.count);
        setCounts(temp)
    }

    useEffect(() => {
        getCounts()
    }, [])

    return (
        <div style={{ marginTop: '30px' }} className="d-flex justify-content-center flex-wrap">
            <div style={{ color: themeText }} className="d-flex flex-column align-items-center event">
                <h4>Aquatics</h4>
                <div className="circle"><img className='internal-image' src={Aquatics} type="svg" /></div>
                <h5>{counts[0]} questions</h5>
            </div>
            <div style={{ color: themeText }} className="d-flex flex-column align-items-center event">
                <h4>Forestry</h4>
                <div className="circle"><img className='internal-image' src={Forestry} type="svg" /></div>
                <h5>{counts[1]} questions</h5>
            </div>
            <div style={{ color: themeText }} className="d-flex flex-column align-items-center event">
                <h4>General</h4>
                <div className="circle"><img className='internal-image' src={General} type="svg" /></div>
                <h5>{counts[2]} questions</h5>
            </div>
            <div style={{ color: themeText }} className="d-flex flex-column align-items-center event">
                <h4>Soils</h4>
                <div className="circle"><div className="circle-soil"><img className='internal-image-soil' src={Soils} type="svg" /></div></div>
                <h5>{counts[3]} questions</h5>
            </div>
            <div style={{ color: themeText }} className="d-flex flex-column align-items-center event">
                <h4>Wildlife</h4>
                <div className="circle"><img className='internal-image' src={Wildlife} type="svg" /></div>
                <h5>{counts[4]} questions</h5>
            </div>
            
        </div>
    )
}
