/**
 * This script is being used to check for an update from Sekai-World/sekai-master-db-diff. If it is, this script will trigger Vercel to redeploy the site.
 */

import axios from 'axios'
import moment from 'moment'
import fs from 'fs'
import path from 'path'

const { DEPLOY_HOOKS, DB_UPDATED_AT } = process.env

const cacheDirectory = path.join(__dirname, '../.cache')
const fileEndpoint = path.join(cacheDirectory, 'data.json')
const defaultValues = {
  version: 1,
  data: {
    updatedAt: moment('2000-06-22').toISOString(),
  },
}

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

  const remoteRepositoryUpdatedAt = moment(DB_UPDATED_AT)

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
