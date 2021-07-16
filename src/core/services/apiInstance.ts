import axios from 'axios'
import moize from 'moize'

const api = <T = unknown>(url: string) => async () => {
  const instance = axios.create({
    baseURL:
      'https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/master',
  })
  const res = await instance.get<T>(url)
  return res.data
}

export const apiInstance = moize(api)
