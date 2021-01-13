import { NextApiHandler } from 'next'

import { SitemapStream, streamToPromise } from 'sitemap'

import { getCards } from '../../core/services/getCards'
import { getEvents } from '../../core/services/getEvents'
import { getGameCharacters } from '../../core/services/getGameCharacters'
import { getMusics } from '../../core/services/getMusics'
import { getVirtualLives } from '../../core/services/getVirtualLives'

const api: NextApiHandler = async (req, res) => {
  const sitemapStream = new SitemapStream({
    hostname: 'https://sekai.rayriffy.com',
  })

  // generic pages
  const pages = [
    '',
    'musics',
    'characters',
    'cards',
    'comics',
    'virtualLives',
    'events',
  ]
  pages.map(page => {
    sitemapStream.write({
      url: page,
      changefreq: 'daily',
      priority: 0.7,
    })
  })

  // data-driven pages
  const [
    cards,
    gameCharacters,
    events,
    musics,
    virtualLives,
  ] = await Promise.all([
    getCards(),
    getGameCharacters(),
    getEvents(),
    getMusics(),
    getVirtualLives(),
  ])

  cards.map(card => {
    sitemapStream.write({
      url: `card/${card.id}`,
      changefreq: 'daily',
      priority: 0.7,
    })
  })

  gameCharacters.map(character => {
    sitemapStream.write({
      url: `character/${character.id}`,
      changefreq: 'daily',
      priority: 0.7,
    })
  })

  events.map(event => {
    sitemapStream.write({
      url: `event/${event.id}`,
      changefreq: 'daily',
      priority: 0.7,
    })
  })

  musics.map(music => {
    sitemapStream.write({
      url: `music/${music.id}`,
      changefreq: 'daily',
      priority: 0.7,
    })
  })

  virtualLives.map(live => {
    sitemapStream.write({
      url: `virtualLive/${live.id}`,
      changefreq: 'daily',
      priority: 0.7,
    })
  })

  // end stream
  sitemapStream.end()

  // send
  const sitemap = await streamToPromise(sitemapStream).then(sm => sm.toString())
  res.write(sitemap)
  res.end()
}

export default api
