import { GetStaticProps, NextPage } from 'next'
import qs from 'query-string'
import {
  FilterBox,
  FilterBoxOptions,
  FilterBoxSelectedFilters,
  FilterOption
} from '../../components/FilterBox'
import { FilterTag, FilterTags } from '../../components/FilterTag'
import { useFilterQuery } from '../../hooks/use-filter-query'
import { Button } from '../../kbridh/Button'
import { Checkbox, Checkboxes, CheckboxLabel } from '../../kbridh/Checkbox'
import { GridColumn } from '../../kbridh/GridColumn'
import { GridRow } from '../../kbridh/GridRow'
import { Masthead } from '../../kbridh/Masthead'
import { Text } from '../../kbridh/Text'
import { withMasthead } from '../../layouts/DefaultLayout'
import { useEffect, useState } from 'react'
import { usePaginatedSwr } from '../../hooks/use-paginated-swr'
import { usePagination } from '../../hooks/use-pagination'
import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../kbridh/Table'
import { Result } from '../../components/FilterError'

const FindImportersLayout = withMasthead(
  <Masthead>
    <GridRow>
      <GridColumn width="two-thirds">
        <Text as="h1" size="heading-xl" className="app-masthead__text">
          Find importers in the importer catalogue
        </Text>
        <Text size="body-l" className="app-masthead__text">
          Search and filter importers in the Netherlands ready to do business in
          your market sector.
        </Text>
      </GridColumn>
    </GridRow>
  </Masthead>,
  {
    title: 'Find importers in the importer catalogue'
  }
)

interface Tag {
  name: string
  id: string
}

interface FindImportersProps {
  tags: Tag[]
}

interface Importer {
  id: string
  companyName: string
  website: string
  tags: Tag[]
}

export const FindImporters: NextPage<FindImportersProps> = (
  props: FindImportersProps
) => {
  const { tags } = props
  const filterTags = useFilterQuery('tags')
  const { page, nextPage, previousPage } = usePagination()
  const [tagsQuery, setTagsQuery] = useState<string>()

  const { data, pagination, error } = usePaginatedSwr<Importer>(
    `${process.env.NEXT_PUBLIC_API_URL}/importers?page=${page}${tagsQuery}`
  )

  useEffect(() => {
    setTagsQuery(() =>
      filterTags.activeQueries.length < 1
        ? ''
        : '&' +
          qs.stringify({
            tags: filterTags.activeQueries
          })
    )
  }, [filterTags])

  const matchTagName = (id: string) => tags.find((tag) => tag.id === id)?.name

  return (
    <FindImportersLayout>
      <GridRow>
        <GridColumn width="one-quarter">
          <FilterBox>
            <FilterBoxSelectedFilters
              numberOfActiveFilters={filterTags.activeQueries.length}
            >
              {filterTags.activeQueries.length ? (
                <>
                  <FilterTags title="Categories">
                    {filterTags.activeQueries.map((query) => (
                      <FilterTag
                        key={`active-filters-category-${query}`}
                        onClick={() => filterTags.mutate(query)}
                      >
                        {matchTagName(query)}
                      </FilterTag>
                    ))}
                  </FilterTags>

                  <Button
                    as="button"
                    color="secondary"
                    className="kbridh-!-margin-top-6 kbridh-!-margin-bottom-0"
                    onClick={() => filterTags.clearAll()}
                  >
                    Clear all filters
                  </Button>
                </>
              ) : null}
            </FilterBoxSelectedFilters>
            <FilterBoxOptions>
              <FilterOption title="Categories">
                <Checkboxes small>
                  {tags.map((tag, idx) => (
                    <Checkbox
                      key={`tag-filter-${idx}-${tag.id}`}
                      id={tag.id}
                      {...filterTags.setProps(tag.id)}
                    >
                      <CheckboxLabel htmlFor={tag.id}>{tag.name}</CheckboxLabel>
                    </Checkbox>
                  ))}
                </Checkboxes>
              </FilterOption>
            </FilterBoxOptions>
          </FilterBox>
        </GridColumn>
        <GridColumn width="three-quarters">
          <Result error={error}>
            <>
              <Table caption="Results">
                <TableHead>
                  <TableRow>
                    <TableHeader
                      scope="col"
                      className="kbridh-!-width-one-third"
                    >
                      Company name
                    </TableHeader>
                    <TableHeader
                      scope="col"
                      className="kbridh-!-width-one-third"
                    >
                      Categories
                    </TableHeader>
                    <TableHeader
                      scope="col"
                      className="kbridh-!-width-one-third"
                    >
                      Website
                    </TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((importer) => (
                    <TableRow key={`importer-result-${importer.id}`}>
                      <TableHeader scope="row" className="kbridh-!-width-one-third">
                        {importer.companyName}
                      </TableHeader>
                      <TableDataCell>
                        {importer.tags.map(({ name }) => name).join(', ')}
                      </TableDataCell>
                      <TableDataCell>
                        <a href={importer.website}>Visit website</a>
                      </TableDataCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                    className="app-pagination__button"
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
    </FindImportersLayout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const tags = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/importers/tags`
  ).then(async (res) => await res.json())

  return {
    props: {
      tags
    }
  }
}

export default FindImporters
