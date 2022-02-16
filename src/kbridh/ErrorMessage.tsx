import classnames from 'classnames'
import { ReactNode } from 'react'

interface ErrorMessageProps {
  children?: ReactNode
  className?: string
  describes?: string
}

export const ErrorMessage = (props: ErrorMessageProps) => {
  const { children, className, describes } = props
  const classes = classnames(className, 'kbridh-error-message')

  const _props = {
    className: classes,
    ...(describes
      ? {
          id: describes + '-error'
        }
      : {})
  }

  return (
    <p {..._props}>
      <span className="kbridh-visually-hidden">Error: </span>
      {children}
    </p>
  )
}
