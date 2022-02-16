import classnames from 'classnames'
import { ReactNode } from 'react'

interface GridRowProps {
  children?: ReactNode
  className?: string
}

export const GridRow = (props: GridRowProps) => {
  const { children, className } = props
  const classes = classnames('kbridh-grid-row', className)
  return <div className={classes}>{children}</div>
}
