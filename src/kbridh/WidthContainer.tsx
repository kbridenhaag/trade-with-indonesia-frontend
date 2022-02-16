import { ReactNode } from 'react'
import classnames from 'classnames'

interface WidthContainerProps {
  children?: ReactNode
  className?: string
}

export const WidthContainer = (props: WidthContainerProps) => {
  const { children, className } = props
  const classes = classnames('kbridh-width-container', className)
  return <div className={classes}>{children}</div>
}
