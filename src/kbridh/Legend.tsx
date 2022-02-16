import classnames from 'classnames'
import { DOMAttributes } from 'react'

interface LegendProps extends DOMAttributes<HTMLLegendElement> {
  size?: 'm' | 'l'
}

export const Legend = (props: LegendProps) => {
  const { children, size = 'm', ...rest } = props

  const classes = classnames('kbridh-fieldset__legend', {
    'kbridh-fieldset__legend--m': size === 'm',
    'kbridh-fieldset__legend--l': size === 'l'
  })

  return (
    <legend className={classes} {...rest}>
      {children}
    </legend>
  )
}
