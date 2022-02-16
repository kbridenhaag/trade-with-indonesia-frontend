import classnames from 'classnames'
import { HTMLAttributes } from 'react'

export interface HintProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const Hint = (props: HintProps) => {
  const { children, className, ...rest } = props

  const classes = classnames('kbridh-hint', className)

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
