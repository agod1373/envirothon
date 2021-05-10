import React from 'react'
import Soils from '../../images/soils.svg'
import Aquatics from '../../images/aquatics.svg'
import Forestry from '../../images/forestry.svg'
import Wildlife from '../../images/wildlife.svg'
import './Events.scss'

export default function Events(props) {
    return (
        <div style={{ marginTop: '30px' }} className="d-flex justify-content-center flex-wrap">
            <div style={{ color: props.text }} className="d-flex flex-column align-items-center event">
                <h6>Soils</h6>
                <div className="circle"><div className="circle-soil"><img className='internal-image-soil' src={Soils} type="svg" /></div></div>
            </div>
            <div style={{ color: props.text }} className="d-flex flex-column align-items-center event">
                <h6>Aquatics</h6>
                <div className="circle"><img className='internal-image' src={Aquatics} type="svg" /></div>
            </div>
            <div style={{ color: props.text }} className="d-flex flex-column align-items-center event">
                <h6>Forestry</h6>
                <div className="circle"><img className='internal-image' src={Forestry} type="svg" /></div>
            </div>
            <div style={{ color: props.text }} className="d-flex flex-column align-items-center event">
                <h6>Wildlife</h6>
                <div className="circle"><img className='internal-image' src={Wildlife} type="svg" /></div>
            </div>
        </div>
    )
}
