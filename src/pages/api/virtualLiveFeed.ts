import { NextApiHandler } from 'next'

import dayjs from 'dayjs'
import ical from 'ical-generator'
import sortBy from 'lodash/sortBy'
import first from 'lodash/first'
import last from 'lodash/last'

import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

import { getVirtualLives } from '../../core/services/getVirtualLives'

dayjs.extend(utc)
dayjs.extend(timezone)

const api: NextApiHandler = async (req, res) => {
  const virtualLives = await getVirtualLives()

  const calendar = ical({
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
      .map(live => {
        const sortedSchedules = sortBy(live.virtualLiveSchedules, 'seq')

        const diffSeconds = dayjs(first(sortedSchedules).endAt).diff(
          dayjs(first(sortedSchedules).startAt),
          'second'
        )

        return {
          uid: `psekai-virtual-live-${live.id}`,
          start: dayjs(first(sortedSchedules).startAt)
            .tz('Asia/Tokyo')
            .toDate(),
          end: dayjs(last(sortedSchedules).endAt).tz('Asia/Tokyo').toDate(),
          summary: live.name,
          url: `https://sekai.rayriffy.com/virtualLive/${live.id}`,
          description: `Duration: ${Math.floor(diffSeconds / 60)} minutes ${
            diffSeconds % 60
          } seconds\n------\n\n${sortedSchedules
            .map(
              (schedule, i) =>
                `Round ${i}: ${dayjs(schedule.startAt)
                  .tz('Asia/Tokyo')
                  .format('DD MMM YYYY HH:MM')} (JST)`
            )
            .join('\n')}`,
        }
      }),
  })

  res.setHeader('Content-Type', 'text/calendar')

  return res.send(calendar.toString())
}

export default api
