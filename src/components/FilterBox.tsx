import { HTMLAttributes, PropsWithChildren } from 'react'
import classnames from 'classnames'
import { FormGroup } from '../kbridh/FormGroup'
import { Fieldset } from '../kbridh/Fieldset'
import { Legend } from '../kbridh/Legend'
import { Text } from '../kbridh/Text'

interface FilterBoxProps
  extends PropsWithChildren<HTMLAttributes<HTMLElement>> {}

export const FilterBox = (props: FilterBoxProps) => {
  const { className, children } = props
  const classes = classnames(className, 'app-filter')
  return (
    <div className={classes} {...props}>
      <div className="app-filter__header">
        <h2 className="kbridh-heading-m">Filter</h2>
      </div>
      <div className="app-filter__content">{children}</div>
    </div>
  )
}

interface FilterBoxSelectedFiltersProps
  extends PropsWithChildren<HTMLAttributes<HTMLElement>> {
  numberOfActiveFilters?: number
}

export const FilterBoxSelectedFilters = (
  props: FilterBoxSelectedFiltersProps
) => {
  const { className, children, numberOfActiveFilters = 0 } = props
  const classes = classnames(className, 'app-filter__selected')

  return (
    <div className={classes}>
      <h3 className="kbridh-heading-m">Selected filters</h3>
      {numberOfActiveFilters > 0 ? (
        children
      ) : (
        <Text className="kbridh-!-margin-bottom-0">
          No filters currently active
        </Text>
      )}
    </div>
  )
}

interface FilterBoxOptionsProps
  extends PropsWithChildren<HTMLAttributes<HTMLElement>> {}

export const FilterBoxOptions = (props: FilterBoxOptionsProps) => {
  const { className, children } = props
  const classes = classnames(className, 'app-filter__options')
  return <div className={classes}>{children}</div>
}

interface FilterOptionProps
  extends PropsWithChildren<HTMLAttributes<HTMLElement>> {
  title: string
  titleType?: 'label' | 'legend'
}

export const FilterOption = (props: FilterOptionProps) => {
  const { children, title, titleType = 'legend' } = props

  const Title = () => <Legend size="m">{title}</Legend>

  return (
    <FormGroup {...props}>
      <Fieldset>
        <Title />
        {children}
      </Fieldset>
    </FormGroup>
  )
}
