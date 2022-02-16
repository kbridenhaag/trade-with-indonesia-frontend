import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { PropsWithChildren, ReactNode } from 'react'
import { Button } from '../kbridh/Button'
import { GridColumn } from '../kbridh/GridColumn'
import { GridRow } from '../kbridh/GridRow'
import { Link } from '../kbridh/Link'
import { Text } from '../kbridh/Text'
import { WidthContainer } from '../kbridh/WidthContainer'
import { withMasthead } from '../layouts/DefaultLayout'
import kbridhBuilding from '../../public/assets/images/kbridh-building.jpg'
import { withAuth } from '../hoc/with-auth'

interface HomeProps {
  numberOfSuppliers: number
  numberOfImporters: number
}

const MastheadSummaryItem = (props: { title: string; children: ReactNode }) => {
  const { title, children } = props
  return (
    <GridColumn
      width="one-third"
      className="kbridh-!-text-align-centre"
      fromDesktop
    >
      <div className="kbridh-!-width-three-quarters app-!-centre">
        <Text as="h2" size="heading-xl">
          {title}
        </Text>
        {children}
      </div>
    </GridColumn>
  )
}

const MastheadSummary = (props: HomeProps) => {
  const mastheadSummaryItems = [
    {
      title: props.numberOfSuppliers + ' suppliers',
      children: (
        <Text size="body-l">
          Are registered in our{' '}
          <Link href="/suppliers">supplier catalogue</Link>
        </Text>
      )
    },
    {
      title: props.numberOfImporters + ' importers',
      children: (
        <Text size="body-l">
          Are registered in our{' '}
          <Link href="/importers">importer catalogue</Link>
        </Text>
      )
    },
    {
      title: '5 publications',
      children: (
        <Text size="body-l">
          Are available to <Link href="/publications">download for free</Link>
        </Text>
      )
    }
  ]
  return (
    <div className="app-masthead__summary">
      <WidthContainer>
        <GridRow>
          {mastheadSummaryItems.map((item, idx) => (
            <MastheadSummaryItem
              key={`mashtead-summary-${idx}`}
              title={item.title}
            >
              {item.children}
            </MastheadSummaryItem>
          ))}
        </GridRow>
      </WidthContainer>
    </div>
  )
}

const HomeLayout = (props: PropsWithChildren<HomeProps>) => {
  const Child = withMasthead(
    <>
      <div className="app-masthead app-masthead--home">
        <WidthContainer className="app-masthead__container--home">
          <div className="app-masthead__content--home">
            {/* <nav className="app-masthead__langauge-selector">
            <ul className="app-masthead__language-selector-list">
              <li className="app-masthead__language-selector-list-item app-masthead__language-selector-list-item--current">
                <span>English</span>
              </li>
              <li className="app-masthead__language-selector-list-item">
                <Link href="/" passHref className="kbridh-link--inverse">
                  Bahasa Indonesia
                </Link>
              </li>
            </ul>
          </nav> */}
            <Text
              size="heading-xl"
              as="h1"
              className="app-masthead__title kbridh-!-margin-bottom-7"
            >
              Your gateway to trading with Indonesia
            </Text>
            <Text size="body-l" className="app-masthead__text">
              Want to import goods from Indonesia? We are here to help you find
              trade opportunities and make yourself visible to suppliers.
            </Text>
            <Button as="internalHref" color="inverted" start href="/suppliers">
              Discover suppliers
            </Button>
          </div>
          <div className="app-masthead__image-container"></div>
        </WidthContainer>
      </div>
      <MastheadSummary {...props} />
    </>,
    { inverseHeaderColor: true }
  )

  return <Child>{props.children}</Child>
}

const Home: NextPage<HomeProps> = (props: HomeProps) => {
  return (
    <>
      <HomeLayout {...props}>
        <GridRow>
          <GridColumn width="one-half">
            <Text as="h2" size="heading-xl">
              How we help
            </Text>
            <Text size="body-l">
              The Department of Trade at the Embassy of the Republic of
              Indonesia helps importers in The Netherlands find and get in touch
              with suppliers in Indonesia.
            </Text>
          </GridColumn>
        </GridRow>
        <GridRow className="kbridh-!-margin-top-6">
          <GridColumn width="one-half" fromDesktop>
            <Text as="h2" size="heading-xl">
              About this website
            </Text>
            <Text size="body-l">
              This website has been made to promote and encourage trade between
              the Netherlands and the Republic of Indonesia and is targeted
              towards both suppliers in Indonesia and importers in the
              Netherlands.
            </Text>
            <Text size="body-l">
              <a href="https://indonesia.nl">Go to Indonesia.nl</a>
            </Text>
          </GridColumn>
        </GridRow>
      </HomeLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const numberOfSuppliers = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/suppliers`
  )
    .then((res) => res.json())
    .then(({ pagination }) => pagination.total)

  const numberOfImporters = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/importers`
  )
    .then((res) => res.json())
    .then(({ pagination }) => pagination.total)

  return {
    props: {
      numberOfSuppliers,
      numberOfImporters
    }
  }
}

export default withAuth(Home)
