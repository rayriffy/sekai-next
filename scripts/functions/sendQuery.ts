import axios from 'axios'

const {
  GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql',
  PERSONAL_TOKEN,
} = process.env

export const sendQuery = (query: string) =>
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
