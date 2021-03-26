import * as fs from 'fs'
import * as path from 'path';
import { defaultConfig, setConfigurationFile } from './../../configuration';

export default (req, res) => {
    setConfigurationFile(defaultConfig)
    console.log('resetted')
    res.send({
        status : 200,
        message : 'Reset'
    })
}