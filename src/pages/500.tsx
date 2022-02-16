import { NextPage } from 'next'
import { Button } from '../kbridh/Button'
import { GridColumn } from '../kbridh/GridColumn'
import { GridRow } from '../kbridh/GridRow'
import { Text } from '../kbridh/Text'
import { DefaultLayout } from '../layouts/DefaultLayout'

const Error500Page: NextPage = () => {
  return (
    <DefaultLayout>
      <GridRow>
        <GridColumn width="two-thirds">
          <Text as="h1" size="heading-xl">
            An error has occurred
          </Text>
          <Text>
            Please try your request again shortly and/or contact the
            administrator at{' '}
            <a className="kbridh-link" href="mailto:mail@opinionated.nl">
              mail@opinionated.nl
            </a>
            .
          </Text>

          <Button as="internalHref" href="/">
            Return to homepage
          </Button>
        </GridColumn>
      </GridRow>
    </DefaultLayout>
  )
}

export default Error500Page
