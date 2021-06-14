import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useTheme } from '../../contexts/ThemeContext'
import { Dropdown } from 'react-bootstrap'
import Header from '../header/Header'
import QuestionReal from './QuestionReal'

export default function Event(props) {
    const { themeBackground, themeText, themeVariant } = useTheme()
    const [questions, setQuestions] = useState([])
    const [load, setLoad] = useState(true)
    const [sort, setSort] = useState('newest-oldest')
    const [transcript, setTranscript] = useState(false)

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
            {props.category==='General Knowledge' && 
                <div>
                    <ReactPlayer style={{ margin: '10px auto' }} url='https://www.youtube.com/watch?v=aYsTRhADX-Q' controls />
                    <p style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => setTranscript(!transcript)}>Show Transcript</p>
                    {transcript && 
                        <p style={{margin: '0px 20px', textAlign: 'center'}}>
                            In a world that runs on water, trying to protect what water resources we have is vital to the continuation of our lives and livelihoods. Clean drinking water allows us to sustain ourselves without fear of illness from contaminated waters, but once a source is contaminated, such as from anthropogenic chemicals or wastes, it can take millions of dollars to take the water through water-treatment plants or to replace existing infrastructure or equipment that no longer works. Until these repairs can be made, people with no other options for drinking water may have to use contaminated sources that cause them illnesses and rack up thousands of dollars in medical bills. It takes decades for the natural water cycle to replenish the source, and until then people must face the financial, physical, and mental strain of knowing they do not have access to clean, safe water. This idea is a great concern to the residents of Burpee County, where the planned addition of a new Bottling Plant has raised concerns amongst the residents over whether their current water resources will be overdrawn or contaminated, and affect their lives and well-being. Our team has created a comprehensive plan called the PACT System, or the Permitted-Action and County Timeline that will ensure that residents will feel the benefits of the new bottling plant, without feeling any additional strain from it. 
                            Water supplies are affected by both non-climate stressors, such as failing infrastructure, an increase in population, point source and nonpoint source pollution; and climate stressors like changes in temperature and the amount and frequency of precipitation. Point sources include factories and sewage treatment plants and nonpoint sources consist of excess fertilizer nutrients and pesticides from agricultural lands, sediment from improperly managed construction sites, and urban runoff like oil, grease and toxic chemicals. The level and quality of surrounding water resources, as well as surrounding ecosystems, will be affected by the construction of the Bubbly Manufacturing Plant. Included in these concerning impacts are the alteration of temperature and water quality in the trout stream and tributaries, a drop in the water table with the withdrawal of water from the nearby lake, increased strain on the aquifer, as well as the loss of wildlife habitats and diversity. 
                            One of the largest Environmental Concerns surrounding the Bottling Plant occurs during the construction phase. Not only is land cleared to support the creation of roads and other impermeable surfaces, construction waste can runoff into the local tributaries and streams, increasing turbidity of water and introducing toxic chemicals. These factors can lead to cultural eutrophication or even anoxic zones in the waterways. Hunting and recreational activities on these waterways such as the nearby trout stream and large lake would be negatively affected as the water would become dirty, algae growth would increase, and local fish species would rapidly die-off. 
                            Burpee County is not only home to multiple ecosystems and numerous species, but also 63,000 people. Residents and businesses rely on the aquifer for their water supply. With a bottling company also drawing on the aquifer, there are concerns that the aquifer will be overdrawn. Imagine turning on your kitchen faucet and no water coming out. This could be what life is like if the aquifer is overdrawn. As a result, the county will be faced with angry residents and they will need to find another water source which is costly. By depleting the aquifer, residents will have to figure out their daily life without access to clean water. This would turn life upside down for  all residents. 
                            While taking too much water from the aquifer is a concern, another concern is what will happen with the plant's gray water. The excess water from soft drink production (from equipment washing, air conditioning, and rinsing) will be at a higher temperature than the stream running through the property. So if the plant simply discharged this water into the stream, there would be thermal pollution. But it's not just warm water temperatures that affect organisms. Warm water also has a lower capacity for holding dissolved oxygen. These two factors negatively affect not only trout but all consumers in the stream by pushing these organisms out of their range of tolerance.
                            The soft drink plant also poses a threat to the nearby wetland. According to the Environmental Protection Agency, wetlands not only are among the most productive ecosystems on planet earth, but provide flood protection, crucial habitat for a range of species from macroinvertebrates to alligators, natural products such as medicine and commercial fishing opportunities. Since the 50-acre wetland area in the property is only 5 miles away from the city, it is even more essential for flood protection, as the pavement and buildings from urban development produce a lot of runoff. The flood protection that these wetlands provide also protects nearby agricultural land. 
                            In order to address these concerns towards the environment and the water for residents, we have developed the PACT system to provide the best transition towards having the new bottling plant in town. 
                            As part of the PACT system, sustainable construction practices would be implemented to provide solutions to the problems stated previously. Firstly, the building will be built as small as possible to limit the amount of land degraded and the site within the 750 acre plot will be carefully chosen to ensure that the minimum number of species will be affected. The nearby wetland is an ecosystem of concern that would be protected. Secondly, construction waste can be kept from entering the water supply through the use of both natural and artificial buffer zones or liners that keep the pollutants and sediments contained. Thirdly, permeable surfaces can be utilized for parking lots and surrounding paths like those described in a recent study conducted by the U.S. Geological Survey. They found that permeable surfaces provide a more natural means of dealing with wastewater that also helps to control water temperature, nutrient levels, and pollutants.
                            As part of our plan, the 750 acre plot will be split into multiple plots zoned for different uses. The nearby towns and villages need more area to expand, especially to support the residences necessary for the new Bottling Plant employees to live. Since the plot is split, areas of concern such as the wetland can be protected. We also recommend the new areas implement multi use zoning which is a more sustainable and people-focused method of urbanization. 
                            To solve the problem of thermal pollution, the plant must discharge water either a) early in the morning after waiting overnight for the water to cool or b) after cooling the water within the plant to the stream temperature. Additionally, the bottling plant must allow trout fishers access to the stream within a reasonable distance of the cooled water discharge area. These solutions will protect the natural state of the stream, and mitigate the concerns of Trout Unlimited. 
                            In light of the added strain on the aquifer and the projected increase in population, we propose the construction of an additional drinking water plant that will draw water from the nearby lake. Adding an additional plant devoted solely to providing clean drinking water will ensure that the residents of Burpee County have sufficient and safe water for consumption.  
                            In an attempt to conserve water, the local government will subsidize drip irrigation. Currently, corn production in the county uses billions of gallons of water. Drip irrigation is 90% efficient compared to spray irrigation which is about 70% efficient. Corn fields requiring irrigation will use less water since there will be less lost to evaporation. This irrigation change does not burden the farmers since the cost is covered for them and the local government can use the increased tax revenue from the bottling plant to cover the cost. Also, by using the Geographic Information Systems residents can identify where the greatest slopes in the county are located. There, rainwater collections can be set up and water collected can be used to water gardens or wash cars. By collecting and reusing water, the amount of water drawn from the aquifer will be decreased. 
                            Our team also proposes that in the long-term, Burpee County upgrade the existing sewer system. Failing infrastructure is a major threat to water as it can let untreated, polluted water be discharged into drinking water sources, which poses severe threats to human health and the environment, at large. By upgrading this infrastructure, not only will water quality be increasingly protected, but more jobs will be created for residents and property taxes will increase, theoretically helping all county residents.
                            In order to further environmental awareness and community activism in the next generation, we believe it is important to educate children about water needs in their lives and the impact of industrial developments on water. In association with the Bubbly Plant, the county plans on funding scholarship programs and clubs in local high schools that would focus on environmental impacts of current developments within the community. In further social outreach programs, we would reach out to groups like 4-H or the FFA to educate future agricultural producers on the benefits of limiting the water used in growing crops and how to protect water resources near fields.
                            In order to further require the Bubbly plant to connect with the citizens of the community, we will require the Bubbly Cola Company to use recycled materials for their bottles. As part of our community outreach, discarded bottles will be collected in town and picked up by the company. These bottles will then be recycled and used once again as the final product. This collection and recycling will create and support jobs and will reduce the amount of waste going to the county landfill. This will also be a good advertising opportunity for Bubbly since recycling is very popular. It may help those concerned about the environmental impacts of the company to see that Bubbly is doing its part to be eco-friendly.
                            Our plan takes into account possible problems that could arise from the construction of the Bottling Facility and the expansion of nearby residential areas as a result of its construction. One of the core facets of our plan is to be proactive rather than reactive. Putting the infrastructure and planning into place to deal with problems in the natural environment such as pollution control and the over-use of the aquifer allows those problems to be solved quickly or mitigated all-together. If our plan was reactive, policies and practices may not be in place that would mitigate any problems that could arise. If they aren’t taken care of or stopped completely, there would be a high economic and environmental cost to solve those problems. 
                            Together, our plan, the PACT System, summarizes our long-term response to threats to water resources by both requirements of the plants’ permit and the county government’s actions. The PACT System is the best way to ensure the needs of all groups within Burpee County are met. This will allow for the residents of this county, whether they may be human, animal, or vegetation, to thrive in their homes. Our resources and citations are listed on the next slide. Thank you for your consideration of our plan. 
                        </p>
                    }
                </div>
            }
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
