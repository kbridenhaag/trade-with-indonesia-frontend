import classnames from 'classnames'
import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react'

type ColumnWidth =
  | 'one-third'
  | 'two-thirds'
  | 'full'
  | 'one-half'
  | 'one-quarter'
  | 'three-quarters'

interface ColumnProps extends PropsWithChildren<HTMLAttributes<HTMLElement>> {
  width?: ColumnWidth
  fromDesktop?: boolean
}

export const GridColumn = (props: ColumnProps) => {
  const {
    children,
    width = 'one-third',
    className,
    fromDesktop = false
  } = props
  const widthClassName = classnames({
    'kbridh-grid-column-one-third': width === 'one-third',
    'kbridh-grid-column-one-quarter': width === 'one-quarter',
    'kbridh-grid-column-two-thirds': width === 'two-thirds',
    'kbridh-grid-column-three-quarters': width === 'three-quarters',
    'kbridh-grid-column-one-half': width === 'one-half',
    'kbridh-grid-column-full': width === 'full'
  })

  const withMediaQuery = fromDesktop
    ? widthClassName + '-from-desktop'
    : widthClassName

  const classes = classnames(className, withMediaQuery)

  return <div className={classes}>{children}</div>
}
