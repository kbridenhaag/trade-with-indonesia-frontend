import classnames from 'classnames'
import { LabelHTMLAttributes } from 'react'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  size?: 'l' | 'm'
}

export const Label = (props: LabelProps) => {
  const { children, className, htmlFor, size = 'm' } = props
  const classes = classnames(className, 'kbridh-label', {
    'kbridh-label--l': size === 'l'
  })

  return (
    <label htmlFor={htmlFor} className={classes}>
      {children}
    </label>
  )
}
