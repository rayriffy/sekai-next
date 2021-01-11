import { NextApiHandler } from 'next'

import dayjs from 'dayjs'
import ical from 'ical-generator'
import { sortBy, first, last } from 'lodash'

import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { getVirtualLives } from '../../core/services/getVirtualLives'

dayjs.extend(utc)
dayjs.extend(timezone)

const api: NextApiHandler = async (req, res) => {
  const virtualLives = await getVirtualLives()

  const calendar = ical({
    domain: 'sekai.rayriffy.com',
    name: 'プロジェクトセカイ バーチャルライブ',
    prodId: {
      company: 'セカイ Wiki',
      product: 'virtual-lives',
      language: 'JP',
    },
    timezone: 'Asia/Tokyo',
    url: 'https://sekai.rayriffy.com/subscribe/virtual-lives.ics',
    ttl: 60 * 60,
    events: virtualLives
      .filter(o => o.virtualLiveType === 'normal')
      .filter(o => o.id !== 51)
      .map(live => {
        const sortedSchedules = sortBy(live.virtualLiveSchedules, 'seq')

        return {
          uid: `psekai-virtual-live-${live.id}`,
          start: dayjs(first(sortedSchedules).startAt).toDate(),
          end: dayjs(last(sortedSchedules).endAt).toDate(),
          summary: live.name,
          url: `https://sekai.rayriffy.com/virtualLive/${live.id}`,
        }
      }),
  })

  res.setHeader('Content-Type', 'text/calendar')

  return res.send(calendar.toString())
}

export default api
