import { ButtonHTMLAttributes, HTMLAttributes, PropsWithChildren } from 'react'
import classnames from 'classnames'

interface FilterTagsProps
  extends PropsWithChildren<HTMLAttributes<HTMLUListElement>> {
  title: string
}

export const FilterTags = (props: FilterTagsProps) => {
  const { className, children, title, ...rest } = props
  const classes = classnames(className, 'app-filter-tags')
  return (
    <>
      <h3 className="kbridh-heading-s kbridh-!-margin-bottom-0">{title}</h3>
      <ul className={classes} {...rest}>
        {children}
      </ul>
    </>
  )
}

interface FilterTagProps
  extends PropsWithChildren<HTMLAttributes<HTMLButtonElement>> {}

export const FilterTag = (props: FilterTagProps) => {
  const { className, children, ...rest } = props
  const classes = classnames(className, 'app-filter__tag')

  return (
    <li>
      <button className={classes} {...rest}>
        {children}
      </button>
    </li>
  )
}
