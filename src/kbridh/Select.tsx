import {
  OptionHTMLAttributes,
  PropsWithChildren,
  SelectHTMLAttributes
} from 'react'
import classnames from 'classnames'

interface SelectProps
  extends PropsWithChildren<SelectHTMLAttributes<HTMLSelectElement>> {}

export const Select = ({ children, className, ...rest }: SelectProps) => {
  const classes = classnames(className, 'kbridh-select')
  return (
    <select className={classes} {...rest}>
      {children}
    </select>
  )
}

interface SelectOptionProps
  extends PropsWithChildren<OptionHTMLAttributes<HTMLOptionElement>> {}

export const SelectOption = ({ children, ...rest }: SelectOptionProps) => {
  return <option {...rest}>{children}</option>
}
