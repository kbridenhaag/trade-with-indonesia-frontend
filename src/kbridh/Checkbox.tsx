import classnames from 'classnames'
import { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { Label, LabelProps } from './Label'

interface CheckboxesProps extends HTMLAttributes<HTMLDivElement> {
  small?: boolean
}

export const Checkboxes = (props: CheckboxesProps) => {
  const { className, small = false, children, ...rest } = props
  const classes = classnames(className, 'kbridh-checkboxes', {
    'kbridh-checkboxes--small': small
  })

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

export const Checkbox = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const { className, children, dangerouslySetInnerHTML, ...rest } = props
  const classes = classnames('kbridh-checkboxes__item', className)
  return (
    <div className={classes}>
      <input className="kbridh-checkboxes__input" type="checkbox" {...rest} />
      {children}
    </div>
  )
}

export const CheckboxLabel = (props: LabelProps) => {
  const { className, children, ...rest } = props
  const classes = classnames(className, 'kbridh-checkboxes__label')

  return (
    <Label className={classes} {...rest}>
      {children}
    </Label>
  )
}
