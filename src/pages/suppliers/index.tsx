import { GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import {
  FilterBox,
  FilterBoxOptions,
  FilterBoxSelectedFilters,
  FilterOption
} from '../../components/FilterBox'
import { Result } from '../../components/FilterError'
import { FilterTag, FilterTags } from '../../components/FilterTag'
import { useFilterQuery } from '../../hooks/use-filter-query'
import { usePaginatedSwr } from '../../hooks/use-paginated-swr'
import { usePagination } from '../../hooks/use-pagination'
import { Checkbox, Checkboxes, CheckboxLabel } from '../../kbridh/Checkbox'
import { FormGroup } from '../../kbridh/FormGroup'
import { GridColumn } from '../../kbridh/GridColumn'
import { GridRow } from '../../kbridh/GridRow'
import { Label } from '../../kbridh/Label'
import { Link } from '../../kbridh/Link'
import { Masthead } from '../../kbridh/Masthead'
import { Select, SelectOption } from '../../kbridh/Select'
import { Text } from '../../kbridh/Text'
import { withMasthead } from '../../layouts/DefaultLayout'
import { withAuth } from '../../hoc/with-auth'

const FindSuppliersLayout = withMasthead(
  <Masthead>
    <GridRow>
      <GridColumn width="two-thirds">
        <Text as="h1" size="heading-xl" className="app-masthead__text">
          Find suppliers in the supplier catalogue
        </Text>
        <Text size="body-l" className="app-masthead__text">
          Looking to do business with Indonesian suppliers? Our repository of
          ready-to-export suppliers makes it easy for you to find and get in
          touch with suppliers in indonesia.
        </Text>
      </GridColumn>
    </GridRow>
  </Masthead>,
  {
    title: 'Find suppliers in the supplier catalogue'
  }
)

interface SupplierTag {
  id: string
  name: string
}

interface FindSuppliersProps {
  tags: SupplierTag[]
}

interface Supplier {
  id: string
  companyName: string
  attachments: {
    url: string
    name: string
  }[]
  address: string
  logo: string
  email: string
  tel: string
  description?: string
  tags: SupplierTag[]
}

const SupplierResult = (supplier: Supplier) => {
  return (
    <li className="kbridh-!-margin-bottom-5">
      <div className="app-!-flex">
        <Link
          className="app-profile__avatar-container kbridh-!-margin-right-5"
          tabIndex={-1}
          href={`/suppliers/${supplier.id}`}
        >
          {supplier.logo ? (
            <img className="app-profile__avatar" src={supplier.logo} alt="" />
          ) : (
            <Text className="app-profile__avater-no-image-available">
              No image available
            </Text>
          )}
        </Link>
        <div className="app-profile__preview">
          <div className="kbridh-heading-m kbridh-!-margin-bottom-1">
            <Link href={`suppliers/${supplier.id}`}>
              {supplier.companyName}
            </Link>
          </div>
          <Text size="body-s" className="app-!-grey">
            {supplier.tags
              .map((tag, idx) =>
                idx === 0 ? tag.name : tag.name.toLowerCase()
              )
              .join(', ')}
          </Text>
          <Text>
            {supplier.description && supplier.description.substring(0, 150)}
            {supplier.description &&
              supplier.description.length >= 150 &&
              '...'}
          </Text>
        </div>
      </div>
    </li>
  )
}

export const FindSuppliers: NextPage<FindSuppliersProps> = (
  props: FindSuppliersProps
) => {
  const { tags } = props
  const matchTagName = (id: string) => tags.find((tag) => tag.id === id)?.name
  const filterTags = useFilterQuery('tags')
  const { page, nextPage, previousPage } = usePagination()
  const [orderBy, setOrderBy] = useState('company-name:asc')
  const { data, pagination, error } = usePaginatedSwr<Supplier>(
    `${process.env.NEXT_PUBLIC_API_URL}/suppliers?page=${page}${filterTags.queryString}&orderBy=${orderBy}`
  )

  return (
    <FindSuppliersLayout>
      <GridRow>
        <GridColumn width="one-quarter">
          <FilterBox>
            <FilterBoxSelectedFilters
              numberOfActiveFilters={filterTags.activeQueries.length}
            >
              <FilterTags title="Tags">
                {filterTags.activeQueries.map((query) => (
                  <FilterTag
                    key={`active-filter-${query}`}
                    onClick={() => filterTags.mutate(query)}
                  >
                    {matchTagName(query)}
                  </FilterTag>
                ))}
              </FilterTags>
            </FilterBoxSelectedFilters>
            <FilterBoxOptions>
              <FilterOption title="Tags">
                <div
                  tabIndex={-1}
                  style={{
                    overflowY: 'scroll',
                    marginLeft: '-10px',
                    height: '300px'
                  }}
                >
                  <div
                    style={{
                      paddingLeft: '10px'
                    }}
                  >
                    <Checkboxes small>
                      {tags.map((tag) => (
                        <Checkbox
                          key={`filter-tag-${tag.id}`}
                          id={tag.id}
                          {...filterTags.setProps(tag.id)}
                        >
                          <CheckboxLabel htmlFor={tag.id}>
                            {tag.name}
                          </CheckboxLabel>
                        </Checkbox>
                      ))}
                    </Checkboxes>
                  </div>
                </div>
              </FilterOption>
            </FilterBoxOptions>
          </FilterBox>
        </GridColumn>
        <GridColumn width="three-quarters">
          <Result error={error}>
            <>
              <FormGroup>
                <Label htmlFor="orderBy">Sort by</Label>
                <Select
                  id="orderBy"
                  onChange={(e) =>
                    setOrderBy(() => {
                      return e.target.value
                    })
                  }
                >
                  <SelectOption value="company-name:asc">
                    Company name (A-Z)
                  </SelectOption>
                  <SelectOption value="company-name:desc">
                    Company name (Z-A)
                  </SelectOption>
                  <SelectOption value="date-added:desc">
                    Date added (newest first)
                  </SelectOption>
                  <SelectOption value="date-added:asc">
                    Date added (oldest first)
                  </SelectOption>
                </Select>
              </FormGroup>
              <ul className="kbridh-list kbridh-list--spacing">
                {data?.map((supplier) => (
                  <SupplierResult key={`result-${supplier.id}`} {...supplier} />
                ))}
              </ul>
              <hr className="kbridh-section-break kbridh-section-break--visible"></hr>
              <div className="app-pagination">
                {pagination.next > 0 && (
                  <button
                    className="app-pagination__button"
                    onClick={() => nextPage()}
                  >
                    <strong className="app-pagination__button-action">
                      Next page
                    </strong>
                    <div className="app-pagination__button-meta">
                      {pagination.currentPage + 1} of {pagination.pageCount}
                    </div>
                  </button>
                )}
                {pagination.previous > 0 && (
                  <button
                    className="app-pagination__button app-pagination__button--previous"
                    onClick={() => previousPage()}
                  >
                    <strong className="app-pagination__button-action">
                      Previous page
                    </strong>
                    <div className="app-pagination__button-meta">
                      {pagination.currentPage - 1} of {pagination.pageCount}
                    </div>
                  </button>
                )}
              </div>
            </>
          </Result>
        </GridColumn>
      </GridRow>
    </FindSuppliersLayout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const tags = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/suppliers/tags`
  ).then((res) => res.json())

  return {
    props: {
      tags
    }
  }
}

export default withAuth(FindSuppliers)
