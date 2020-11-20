import { FunctionComponent, useMemo, useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { useStoreon } from '../../context/storeon'

interface Props {
  title?: string
  description?: string
}

export const HeadTitle: FunctionComponent<Props> = props => {
  const {
    title,
    description = 'Data explorer for Project Sekai Colorful Stage',
    children,
  } = props

  const router = useRouter()
  const { dispatch } = useStoreon('title')

  const transformedTitle = useMemo(
    () => (title ? `${title} · セカイ Wiki` : 'セカイ Wiki'),
    [title]
  )

  useEffect(() => {
    dispatch('title/set', title)
  }, [title])

  return (
    <Head>
      <title>{transformedTitle}</title>
      <meta name="title" content={transformedTitle} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={router.asPath} />
      <meta property="og:title" content={transformedTitle} />
      <meta property="og:description" content={description} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={router.asPath} />
      <meta property="twitter:title" content={transformedTitle} />
      <meta property="twitter:description" content={description} />

      <link
        rel="stylesheet"
        media="screen,print"
        href="https://rsms.me/inter/inter.css"
      ></link>

      {children}
    </Head>
  )
}
