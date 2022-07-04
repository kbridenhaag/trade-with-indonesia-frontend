import { GetStaticProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
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
import { format } from 'date-fns'

const PublicationsLayout = withMasthead(
  <Masthead>
    <GridRow>
      <GridColumn width="two-thirds">
        <Text as="h1" size="heading-xl" className="app-masthead__text">
          Download research and publications
        </Text>
        <Text size="body-l" className="app-masthead__text">
          We regularly carry out and publish market research to help you guide
          your business in the Netherlands.
        </Text>
      </GridColumn>
    </GridRow>
  </Masthead>,
  {
    title: 'Download research and publications'
  }
)

interface PublicationCategory {
  id: string
  name: string
}

const publicationCategories: PublicationCategory[] = [
  {
    id: '1',
    name: 'Laporan Analisis Intellijen Bisnis'
  },
  {
    id: '2',
    name: 'Market Brief'
  }
]

interface Publication {
  title: string
  date: string
  url: string
  size: string
  category: string
}

interface PublicationsProps {
  categories: PublicationCategory[]
  publications: Publication[]
}

const matchCategoryNames = (id: string) =>
  publicationCategories.find((category) => category.id === id)?.name

export const PublicationResult = (props: Publication) => {
  const { title, date, url, size, category } = props

  const formattedDate = format(new Date(date), 'MMMM yyyy')

  return (
    <li className="kbridh-!-margin-bottom-4">
      <h3 className="kbridh-heading-m kbridh-!-margin-bottom-1">
        <a className="kbrinl-link" href={url}>
          {' '}
          {title}
        </a>
      </h3>
      <div className="kbridh-body-s app-!-grey kbridh-!-margin-bottom-1">
        {matchCategoryNames(category)}
      </div>
      <div className="kbridh-body-s app-!-grey kbridh-!-margin-bottom-1">
        Published {formattedDate}
      </div>
      <div className="kbridh-body-s app-!-grey">PDF {size}</div>
    </li>
  )
}

const Publications: NextPage<PublicationsProps> = (
  props: PublicationsProps
) => {
  const { categories, publications } = props
  const filterCategory = useFilterQuery('categories')

  const [filteredPublications, setFilteredPublications] = useState(publications)

  useEffect(() => {
    setFilteredPublications(() => {
      if (!filterCategory.isActive) {
        return publications.sort((a, b) => b.title.localeCompare(a.title))
      }
      return publications
        .filter((publication) =>
          filterCategory.activeQueries.includes(publication.category)
        )
        .sort((a, b) => b.title.localeCompare(a.title))
    })
  }, [filterCategory.activeQueries, filterCategory.isActive, publications])

  return (
    <PublicationsLayout>
      <GridRow>
        <GridColumn width="one-quarter">
          <FilterBox>
            <FilterBoxSelectedFilters
              numberOfActiveFilters={filterCategory.activeQueries.length}
            >
              {filterCategory.activeQueries.length >= 1 && (
                <>
                  <FilterTags title="Category">
                    {filterCategory.activeQueries.map((query, idx) => (
                      <FilterTag
                        key={`active-filter-${query}`}
                        onClick={() => filterCategory.mutate(query)}
                      >
                        {matchCategoryNames(query)}
                      </FilterTag>
                    ))}
                  </FilterTags>

                  <Button
                    as="button"
                    color="secondary"
                    className="kbridh-!-margin-top-6 kbridh-!-margin-bottom-0"
                    onClick={() => filterCategory.clearAll()}
                  >
                    Clear all filters
                  </Button>
                </>
              )}
            </FilterBoxSelectedFilters>
            <FilterBoxOptions>
              <FilterOption title="Category">
                <Checkboxes small>
                  {categories.map((category, idx) => (
                    <Checkbox
                      key={`filter-checkbox-${idx}`}
                      id={category.id}
                      name="category"
                      {...filterCategory.setProps(category.id)}
                    >
                      <CheckboxLabel htmlFor={category.id}>
                        {category.name}
                      </CheckboxLabel>
                    </Checkbox>
                  ))}
                </Checkboxes>
              </FilterOption>
            </FilterBoxOptions>
          </FilterBox>
        </GridColumn>
        <GridColumn width="two-thirds">
          <ul className="kbridh-list">
            {filteredPublications.map((publication) => (
              <PublicationResult
                key={`publication-result-${publication.title}`}
                {...publication}
              />
            ))}
          </ul>
        </GridColumn>
      </GridRow>
    </PublicationsLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const publications = [
    {
      title: 'Intellijen Bisnis: Produk Kopi (HS 0901) di Belanda',
      date: new Date(2021, 9, 1),
      url: 'https://core.fuga.cloud:8080/2388f78ccebb416daa560e2453f9e53c:batik/trade-publications/Laporan%20Analisis%20Intelijen%20Bisnis-%20Atdag%20Belanda%202021-%20Kopi%20(HS%200901)(1).pdf',
      category: '1'
    },
    {
      title:
        'Intellijen Bisnis: Produk Minyak Kelapa Sawit dan Turunannya (HS 1511) di Belanda',
      date: new Date(2021, 7, 1),
      url: 'https://core.fuga.cloud:8080/2388f78ccebb416daa560e2453f9e53c:batik/trade-publications/Laporan%20Analisis%20Intelijen%20Bisnis-%20Atdag%20Belanda%202021-%20Produk%20CPO%20dan%20turunannya(1).pdf',
      category: '1'
    },
    {
      title:
        'Informasi Produk/Komoditas Ekspor Indonesia Yang Meningkat ke Belanda Selama Tahun 2020',
      date: new Date(2021, 0, 1),
      url: 'https://core.fuga.cloud:8080/2388f78ccebb416daa560e2453f9e53c:batik/trade-publications/Market%20Brief-Impor%20Belanda%20dari%20Indonesia%20yang%20meningkat%20tahun%202020_Final(1).pdf',
      category: '2'
    },
    {
      title: 'Informasi Peluang Pasar Produk Makanan dan Minuman di Belanda',
      date: new Date(2021, 6, 1),
      url: 'https://core.fuga.cloud:8080/2388f78ccebb416daa560e2453f9e53c:batik/trade-publications/Market%20Brief-Informasi%20Peluang%20Pasar%20Produk%20Makanan%20dan%20Minuman%20di%20Belanda%202021_Final(1).pdf',
      category: '2'
    },
    {
      title: 'Informasi Peluang Pasar Produk Rempah-Rempah (spices) di Belanda',
      date: new Date(2021, 3, 1),
      url: 'https://core.fuga.cloud:8080/2388f78ccebb416daa560e2453f9e53c:batik/trade-publications/Market%20Brief-Informasi%20Peluang%20Pasar%20Produk%20Rempah%20(spices)%20di%20Belanda%202021_Final(1).pdf',
      category: '2'
    }
  ]

  const publicationsList = await Promise.all(
    publications.map(async (publication) => {
      const result = await fetch(publication.url, {
        method: 'head'
      })

      const size = result.headers.get('content-length')

      const sizeInMb = (size ? (parseInt(size) * 10e-7).toFixed(2) : 0) + 'MB'

      return {
        ...publication,
        size: sizeInMb
      }
    })
  )

  return {
    props: {
      categories: publicationCategories,
      publications: JSON.parse(JSON.stringify(publicationsList))
    }
  }
}

export default Publications
