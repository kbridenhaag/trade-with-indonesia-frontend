import classnames from 'classnames'
import { HTMLAttributes } from 'react'

interface FieldsetProps extends HTMLAttributes<HTMLFieldSetElement> {}

export const Fieldset = (props: FieldsetProps) => {
  const { children, ...rest } = props
  const classes = classnames('kbridh-fieldset')

  return (
    <fieldset className={classes} {...rest}>
      {children}
    </fieldset>
  )
}
