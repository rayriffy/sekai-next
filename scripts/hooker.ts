/**
 * This script is being used to check for an update from Sekai-World/sekai-master-db-diff. If it is, this script will trigger Vercel to redeploy the site.
 */

import axios from 'axios'
import moment from 'moment'
import fs from 'fs'
import path from 'path'

const {
  GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql',
  GITHUB_TOKEN = '631008ab5c5fc8e673c8ad552471813aec740b28',
  DEPLOY_HOOKS = 'https://api.vercel.com/v1/integrations/deploy/QmQbn9qoj3vjq4mxvKrU5ByewFrzzCJUSYscgR226F9tnW/L7bw8QdClu',
} = process.env

const cacheDirectory = path.join(__dirname, '../.cache')
const fileEndpoint = path.join(cacheDirectory, 'data.json')
const defaultValues = {
  version: 1,
  data: {
    updatedAt: moment('2000-06-22').toISOString(),
  },
}

const sendQuery = (query: string) =>
  axios.post(
    GITHUB_GRAPHQL_URL,
    {
      query,
    },
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: `application/json`,
      },
    }
  )

;(async () => {
  // If cache directory does not exist, then create it with default value
  if (!fs.existsSync(cacheDirectory)) {
    fs.mkdirSync(cacheDirectory)
  }

  if (!fs.existsSync(fileEndpoint)) {
    fs.writeFileSync(fileEndpoint, JSON.stringify(defaultValues))
  } else if (
    JSON.parse(fs.readFileSync(fileEndpoint).toString()).version !==
    defaultValues.version
  ) {
    // If version mismatch, then reset
    fs.writeFileSync(fileEndpoint, JSON.stringify(defaultValues))
  }

  // Read a file
  const metadata = JSON.parse(fs.readFileSync(fileEndpoint).toString())
  const currentUpdatedAt = moment(metadata.data.updatedAt)

  // Get latest update from GitHub API
  const getDataQuery = `
    query { 
      repository(name: "sekai-master-db-diff", owner: "Sekai-World") {
        updatedAt
      }
    }
  `
  const res = await sendQuery(getDataQuery)

  const remoteRepositoryUpdatedAt = moment(res.data.data.repository.updatedAt)

  if (currentUpdatedAt.isBefore(remoteRepositoryUpdatedAt)) {
    console.log('Update found! Pinging an update to Vercel')

    // Ping
    await axios.post(DEPLOY_HOOKS)

    // Pong
    fs.writeFileSync(
      fileEndpoint,
      JSON.stringify({
        ...metadata,
        data: {
          ...metadata.data,
          updatedAt: remoteRepositoryUpdatedAt.toISOString(),
        },
      })
    )
  }
})()

// noob
export default {}
