import axios from 'axios'

export const apiInstance = <T = unknown>(url: string) => async () => {
  const res = await axios.get<T>('url')
  return res.data
}
