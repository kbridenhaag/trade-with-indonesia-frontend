import { GetServerSideProps, NextPage } from 'next'
import { PropsWithChildren } from 'react'
import { Result } from '../../components/FilterError'
import { GridColumn } from '../../kbridh/GridColumn'
import { GridRow } from '../../kbridh/GridRow'
import { Masthead } from '../../kbridh/Masthead'
import { Text } from '../../kbridh/Text'
import { withMasthead } from '../../layouts/DefaultLayout'
import { Button } from '../../kbridh/Button'
import { withAuth } from '../../hoc/with-auth'

interface Supplier {
  id: string
  companyName: string
  contactPerson: string
  description?: string
  website?: string
  tel: string
  email: string
  logo?: string
  address: string
  tags: {
    id: string
    name: string
  }[]
  attachments: {
    name: string
    url: string
  }[]
}

interface SupplierProfilePageProps {
  notFound: boolean
  supplier?: Supplier
}

const SupplierProfilePageLayout = ({
  children,
  ...rest
}: PropsWithChildren<SupplierProfilePageProps>) => {
  const { supplier, notFound } = rest
  const Child = withMasthead(
    <Masthead>
      <GridRow>
        <GridColumn width="two-thirds">
          {supplier && (
            <span className="kbridh-caption-l">Supplier profile</span>
          )}
          <Text
            as="h1"
            size="heading-xl"
            className="app-masthead__text kbridh-!-margin-bottom-4"
          >
            {supplier ? supplier.companyName : 'Company not found'}
          </Text>
        </GridColumn>
      </GridRow>
    </Masthead>,
    {
      title: supplier
        ? 'Supplier profile: ' + supplier.companyName
        : 'Company not found'
    }
  )

  return <Child>{children}</Child>
}

const SupplierProfilePage: NextPage<SupplierProfilePageProps> = (
  props: SupplierProfilePageProps
) => {
  const { notFound, supplier } = props

  return (
    <SupplierProfilePageLayout {...props}>
      <Result error={notFound}>
        {supplier && (
          <GridRow>
            <GridColumn width="one-quarter">
              <div className="app-profile__avatar-container app-profile__avatar-container--large kbridh-!-margin-bottom-6">
                {supplier.logo ? (
                  <img
                    className="app-profile__avatar"
                    src={supplier.logo}
                    alt=""
                  />
                ) : (
                  <Text className="app-profile__avater-no-image-available">
                    No image available
                  </Text>
                )}
              </div>
              <Button
                as="externalHref"
                href={`mailto:${supplier.email}`}
                start
                className="app-!-block"
              >
                Contact this supplier
              </Button>
            </GridColumn>
            <GridColumn width="three-quarters">
              <Text as="h2" size="heading-l">
                Supplier details
              </Text>
              <Text
                as="h3"
                size="heading-m"
                className="kbridh-!-margin-bottom-0"
              >
                Categories
              </Text>
              <Text>
                {supplier.tags
                  .map((tag, idx) =>
                    idx === 0 ? tag.name : tag.name.toLowerCase()
                  )
                  .join(', ')}
              </Text>
              <Text
                as="h3"
                size="heading-m"
                className="kbridh-!-margin-bottom-0"
              >
                Description
              </Text>
              <Text>
                {supplier.description
                  ? supplier.description
                  : 'This supplier did not provide a description.'}
              </Text>
              <Text
                as="h3"
                size="heading-m"
                className="kbridh-!-margin-bottom-0"
              >
                Address
              </Text>
              <Text>{supplier.address}</Text>
              <Text
                as="h3"
                size="heading-m"
                className="kbridh-!-margin-bottom-0"
              >
                Website
              </Text>
              <Text>
                {supplier.website ? (
                  <a href={supplier.website}>{supplier.website}</a>
                ) : (
                  'This supplier did not provide a website.'
                )}
              </Text>
              <hr className="kbridh-section-break kbridh-section-break--l kbridh-section-break--visible"></hr>
              <Text as="h4" size="heading-l">
                Media
              </Text>
              {supplier.attachments.length < 1 ? (
                <Text>This supplier did not provide any media.</Text>
              ) : (
                <ul className="kbridh-list">
                  {supplier.attachments
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((attachment) => (
                      <li key={attachment.url}>
                        <a className="kbridh-link" href={attachment.url}>
                          {attachment.name}
                        </a>
                      </li>
                    ))}
                </ul>
              )}
            </GridColumn>
          </GridRow>
        )}
      </Result>
    </SupplierProfilePageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id

  if (!id) {
    return {
      props: {
        notFound: true
      }
    }
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/suppliers/${ctx.params?.id}`
  )

  if (response.ok) {
    return {
      props: {
        supplier: await response.json(),
        notFound: false
      }
    }
  } else {
    return {
      props: {
        notFound: true
      }
    }
  }
}

export default withAuth(SupplierProfilePage)
