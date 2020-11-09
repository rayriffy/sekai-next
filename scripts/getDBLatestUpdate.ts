/**
 * This script is being used to check for an update from Sekai-World/sekai-master-db-diff. If it is, this script will trigger Vercel to redeploy the site.
 */

import { sendQuery } from './functions/sendQuery'
;(async () => {
  const query = `
    query { 
      repository(name: "sekai-master-db-diff", owner: "Sekai-World") {
        updatedAt
      }
    }
  `

  const res = await sendQuery(query)

  console.log(JSON.stringify(res.data.data.repository.updatedAt))
})()

// noob
export default {}
