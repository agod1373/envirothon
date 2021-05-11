import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import Soils from '../../images/soils.svg'
import Aquatics from '../../images/aquatics.svg'
import Forestry from '../../images/forestry.svg'
import Wildlife from '../../images/wildlife.svg'
import General from '../../images/general.svg'
import './Events.scss'

export default function Events() {
    const { themeText } = useTheme()

    return (
        <div style={{ marginTop: '30px' }} className="d-flex justify-content-center flex-wrap">
            <div style={{ color: themeText }} className="d-flex flex-column align-items-center event">
                <h4>Soils</h4>
                <div className="circle"><div className="circle-soil"><img className='internal-image-soil' src={Soils} type="svg" /></div></div>
            </div>
            <div style={{ color: themeText }} className="d-flex flex-column align-items-center event">
                <h4>Aquatics</h4>
                <div className="circle"><img className='internal-image' src={Aquatics} type="svg" /></div>
            </div>
            <div style={{ color: themeText }} className="d-flex flex-column align-items-center event">
                <h4>Forestry</h4>
                <div className="circle"><img className='internal-image' src={Forestry} type="svg" /></div>
            </div>
            <div style={{ color: themeText }} className="d-flex flex-column align-items-center event">
                <h4>Wildlife</h4>
                <div className="circle"><img className='internal-image' src={Wildlife} type="svg" /></div>
            </div>
            <div style={{ color: themeText }} className="d-flex flex-column align-items-center event">
                <h4>General Knowledge</h4>
                <div className="circle"><img className='internal-image' src={General} type="svg" /></div>
            </div>
        </div>
    )
}
