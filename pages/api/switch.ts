import axios from 'axios';
import { setConfigurationFile } from './../../configuration';

export default (req, res) => {

    const {timeout} = req.body
    const {streamerName} = req.body
    const {streamerId} = req.body

    console.log(timeout)

    setConfigurationFile({
        streamerId : streamerId,
        streamerName : streamerName,
        api : 'https://compare.topadsservices.com',
        primaryColor : '#2b2b2b',
        secondaryColor : '#e1b96e',
        fontString : "https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap",
        font : 'Turret Road',
        geoApi : 'https://api.ipgeolocation.io/ipgeo'
    })


    setTimeout(async () => {
        try {
            await axios.get(` https://casinosquad.toply.info/api/reset`)
        } catch (error) {
            console.log(error)
        }
    }, timeout * 1000 * 60)

    res.send({
        status : 200,
        message : 'Switched'
    })
}

export const config = {
    api: {
      bodyParser: true,
    },
  }