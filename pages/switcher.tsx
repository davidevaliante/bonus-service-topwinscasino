import { Select, MenuItem, FormControl, Button, InputLabel, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import FullPageLoader from '../components/FullPageLoader';
import { configuration } from '../configuration';
import AquaClient from '../graphql/aquaClient';
import styled from 'styled-components'
import axios from 'axios';
import { FunctionComponent } from 'react';

interface Props {
    cStreamer : Streamer
}

interface Streamer {
    id : number | string,
    alias : string
}

const streamersQuery = `
    query{
        streamers{
            id
            alias
        }
    }
`

const switcher : FunctionComponent<Props> = ({cStreamer}) => {

    const [loading, setLoading] = useState(true)
    const aquaClient = new AquaClient()
    const [resetTime, setResetTime] = useState(60)

    const [streamers, setStreamers] = useState<Streamer[]>([])
    const [currentStreamer, setCurrentStreamer] = useState<Streamer>(cStreamer)

    const [streamer, setStreamer] = useState(configuration.streamerName)

    console.log(currentStreamer.alias)

    useEffect(() => {
        getStreamers()
    }, [])

    const getStreamers = async () => {
        const streamers = await aquaClient.query({
            query : streamersQuery,
            variables : {}
        })

        console.log(streamers.data.data.streamers as Streamer[])
        setStreamers(streamers.data.data.streamers as Streamer[])
        
        setLoading(false)
    }

    const handleChange = (newValue : string) => {
        if(streamers.find(s => s.alias === newValue) !== undefined){
            const s = streamers.find(s => s.alias === newValue)

            setCurrentStreamer({
                id : s ? s.id : 1,
                alias : newValue
            })
        } 

       
    }

    const handleConfirm = async () => {
        const r = await axios.post(`https://casinosquad.toply.info/api/switch`, {
            timeout : resetTime,
            streamerName : currentStreamer.alias,
            streamerId : currentStreamer.id
        })
    }

    const handleReset = async () => {
        const r = await axios.get(`https://casinosquad.toply.info/api/reset`)
    }

    if(loading) return <FullPageLoader />
    return (
        <div style={{padding : '4rem'}}>
            <div>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    Switch
                </InputLabel>
                <Select
                    labelId="demo-simple-select-placeholder-label-label"
                    label='Switch'
                    id="demo-simple-select"
                    value={currentStreamer.alias}
                    onChange={e => handleChange(e.target.value as string)}
                    >
                    {streamers.map(s => <MenuItem key={s.id} value={s.alias}>{s.alias}</MenuItem>)}
                </Select>
            </div>
            
            <TextField 
                id="standard-basic" 
                style={{marginTop : '2rem'}}
                value={resetTime}
                type='number'
                onChange={e => setResetTime(parseInt(e.target.value))}
                label="Reset time (in minuti)" />
            <Button variant='contained' color='primary' onClick={handleConfirm}>Conferma</Button>
            <Button variant='contained' color='secondary' onClick={handleReset}>Reset</Button>
        </div>
    )
}

export async function getServerSideProps({ query }) {

    const pickedBonus = query.options
  
    const aquaClient = new AquaClient()
  
    const streamer = await axios.get(`${configuration.api}/streamers/${configuration.streamerId}`)
   
    return {
        props: {
            cStreamer : {
                id : configuration.streamerId,
                alias : configuration.streamerName
            }
        }
    }
  }



export default switcher
