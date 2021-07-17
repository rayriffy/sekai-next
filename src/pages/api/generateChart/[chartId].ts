import { NextApiHandler } from 'next'

import axios from 'axios'
import { replace } from 'lodash'

// read svg chart and convert blob resources point to local cdn prevent original cdn to  overload
const api: NextApiHandler = async (req, res) => {
  const originalSVG = await axios.get<string>(
    `https://minio.dnaroma.eu/sekai-assets/music/charts/${String(
      req.query.chartId
    ).padStart(4, '0')}/master.svg`
  )
  const modifiedSVG = replace(
    originalSVG.data,
    new RegExp('pjsek.ai/images/song', 'g'),
    'sekai.rayriffy.com/static'
  )

  res.send(modifiedSVG)
}

export default api
