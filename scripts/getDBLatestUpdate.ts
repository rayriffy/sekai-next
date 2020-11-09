/**
 * This script is being used to check for an update from Sekai-World/sekai-master-db-diff. If it is, this script will trigger Vercel to redeploy the site.
 */

import axios from 'axios'

const {
  GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql',
  PERSONAL_TOKEN,
} = process.env

const sendQuery = (query: string) =>
  axios.post(
    GITHUB_GRAPHQL_URL,
    {
      query,
    },
    {
      headers: {
        Authorization: `Bearer ${PERSONAL_TOKEN}`,
        Accept: `application/json`,
      },
    }
  )

;(async () => {
  const query = `
    query { 
      repository(name: "sekai-master-db-diff", owner: "Sekai-World") {
        updatedAt
      }
    }
  `

  const res = await sendQuery(query)

  console.log(JSON.stringify(res.data.data))
})()

// noob
export default {}
