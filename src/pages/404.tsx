import { NextPage } from 'next'
import { Button } from '../kbridh/Button'
import { GridColumn } from '../kbridh/GridColumn'
import { GridRow } from '../kbridh/GridRow'
import { Link } from '../kbridh/Link'
import { Text } from '../kbridh/Text'
import { DefaultLayout } from '../layouts/DefaultLayout'

const Error400Page: NextPage = () => {
  return (
    <DefaultLayout>
      <GridRow>
        <GridColumn width="two-thirds">
          <Text as="h1" size="heading-xl">
            Page not found
          </Text>
          <Text>
            The page you were looking for could not be found. It could be that:
          </Text>

          <ul className="kbridh-list kbridh-list--bullet">
            <li>the URL in the address bar is incorrect</li>
            <li>
              the page you are trying to access does not or no longer exists
            </li>
          </ul>

          <Text>
            Please check if the URL is correct or{' '}
            <Link href="/">return to the homepage</Link>.
          </Text>
        </GridColumn>
      </GridRow>
    </DefaultLayout>
  )
}

export default Error400Page
