import Head from 'next/head'
import { ReactNode } from 'react'
import { AuthBanner } from '../components/AuthBanner'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { WidthContainer } from '../kbridh/WidthContainer'

interface DefaultLayoutProps {
  children?: ReactNode
  title?: string
}

export const DefaultLayout = (props: DefaultLayoutProps) => {
  const { children, title = 'Trade with Indonesia' } = props
  return (
    <>
      <Head>
        <title>{props.title ? title + ' - Trade with Indonesia' : title}</title>
      </Head>
      <AuthBanner />
      <Header></Header>
      <main id="main" className="kbridh-main-wrapper">
        <WidthContainer>{children}</WidthContainer>
      </main>
      <Footer />
    </>
  )
}

export const withMasthead = (
  masthead?: ReactNode,
  options: {
    title?: string
    inverseHeaderColor?: boolean
  } = {}
) => {
  const {
    title = 'Trade with Indonesia',
    inverseHeaderColor: inverse = false
  } = options
  return function DefaultLayout({ children }: { children?: ReactNode }) {
    return (
      <>
        <Head>
          <title>
            {options.title ? title + ' - Trade with Indonesia' : title}
          </title>
        </Head>
        <AuthBanner />
        <Header inverse></Header>
        {masthead}
        <main id="main" className="kbridh-main-wrapper">
          <WidthContainer>{children}</WidthContainer>
        </main>
        <Footer />
      </>
    )
  }
}
