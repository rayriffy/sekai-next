import { FunctionComponent, Fragment, useMemo, useEffect } from 'react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { useStoreon } from '../../context/storeon'

interface Props {
  title?: string
  description?: string
  disableOg?: boolean
}

export const HeadTitle: FunctionComponent<Props> = props => {
  const {
    title,
    description = 'Data explorer for Project Sekai Colorful Stage',
    children,
    disableOg,
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

      {!disableOg && (
        <Fragment>
          <meta key="og:type" property="og:type" content="website" />
          <meta key="og:url" property="og:url" content={router.asPath} />
          <meta key="og:title" property="og:title" content={transformedTitle} />
          <meta
            key="og:description"
            property="og:description"
            content={description}
          />

          <meta
            key="twitter:card"
            property="twitter:card"
            content="summary_large_image"
          />
          <meta
            key="twitter:url"
            property="twitter:url"
            content={router.asPath}
          />
          <meta
            key="twitter:title"
            property="twitter:title"
            content={transformedTitle}
          />
          <meta
            key="twitter:description"
            property="twitter:description"
            content={description}
          />
        </Fragment>
      )}

      <link
        rel="stylesheet"
        media="screen,print"
        href="https://rsms.me/inter/inter.css"
      ></link>

      {children}
    </Head>
  )
}
