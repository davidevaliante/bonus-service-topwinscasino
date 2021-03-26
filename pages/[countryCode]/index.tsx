import styled from 'styled-components'
import Head from 'next/head'
import React, { FunctionComponent, useEffect, useState } from 'react';
import axios from 'axios';
import BonusStripe from '../../components/BonusStripe/BonusStripe';
import FullPageLoader from '../../components/FullPageLoader';
import Wrapper from '../../components/Layouts/Wrapper';
import VideoDiscalimer from '../../components/VideoDisclaimer/VideoDisclaimer';
import { configuration } from '../../configuration';
import AquaClient from '../../graphql/aquaClient';
import { Streamer, StreamerBonus } from '../../models/streamer';
import lowerCase from 'lodash/lowerCase'
import Container from '../../components/Layouts/Container';

interface Props {
  streamerData : Streamer,
  _countryCode : string
}

const translations = {
    it : 'Migliori casinò legali dove trovare questi giochi:',
    row : 'Best websites for this games:',
    de :  'Finden Sie die Top-Casino-Auswahl',
    es :  'Mejores opciones de casino',    
    fi : 'Parhaat kasinovaihtoehdot',
    no : 'Finne de beste casino valg',
    se : 'Du hitta valen för top kasino',
    pt : 'Encontrará as melhores opções de cassino'
}

const index : FunctionComponent<Props> = ({streamerData, _countryCode}) => {

    const [loading, setLoading] = useState(true)
    const [country, setCountry] = useState<string>(_countryCode)


    const [bonuses, setBonuses] = useState<StreamerBonus[] | undefined>(undefined)
    useEffect(() => {

    }, [bonuses])

    const translate = () => translations[country] ? translations[country] : translations['row']

    useEffect(() => {
        getBonusList()
    }, [])


    const getBonusList = async () => {
        let bonusForCountry = streamerData.countryBonusList.filter(it => it.label  === country)
        console.log(bonusForCountry[0])
        const ordering = bonusForCountry[0]['ordering']

    

        const requests = bonusForCountry[0].bonuses.map(b =>  axios.get(`${configuration.api}/bonuses/${b.id}`))

        const bList = await Promise.all(requests) 
        const bs = bList.map(r => r.data as StreamerBonus)

        if(ordering !== '' && ordering !== undefined){
            const codes = ordering.split(' ')
            const orderedBonuses = codes.map(code => bs.find(b => b.compareCode === code)).filter(it => it !== undefined) as StreamerBonus[]
            const rest = bs.filter(b => !codes.includes(b.compareCode))
            console.log(rest)
            setBonuses([...orderedBonuses, ...rest])
        } else {
            setBonuses(bList.map(r => r.data as StreamerBonus))
        }

        setLoading(false)
    }

    if(loading) return <FullPageLoader />
    return (
        <Wrapper>
            <Container>
                <div className='top-bar'>
                    <img className='logo' src='/icons/app_icon.png' />
                </div>

                <h1>{translate()}</h1>

                {bonuses && bonuses.length > 2 && bonuses.map((bonus : StreamerBonus) => <BonusStripe key={`${bonus.name}`} bonus={bonus} countryCode={country} />)}

                {bonuses && bonuses.length <= 2 && streamerData.bonuses.map((bonus : StreamerBonus) => <BonusStripe key={`${bonus.name}`} bonus={bonus} countryCode={country} />)}

                <div style={{ padding: '1rem' }}>
                    <VideoDiscalimer countryCode={_countryCode}/>
                </div>
                <div className='bottom'>
                    <p style={{textAlign : 'center'}}>This service is provided by <a href='https://www.topaffiliation.com'>Top Affiliation</a></p>
                </div>
            </Container>
        </Wrapper>
    )
}

export async function getServerSideProps({ query }) {

  const country = query.countryCode
  console.log(country)

  const streamer = await axios.get(`${configuration.api}/streamers/${configuration.streamerId}`)
 
  return {
      props: {
          _countryCode : country,
          streamerData : streamer.data as Streamer,
      }
  }
}

export default index
