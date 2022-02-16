import classnames from 'classnames'
import { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { Hint, HintProps } from './Hint'
import { Label } from './Label'

export const Radios = (props: HTMLAttributes<HTMLDivElement>) => {
  const { children, className } = props

  const classes = classnames('kbridh-radios', className)

  return <div className={classes}>{children}</div>
}

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Radio = (props: RadioProps) => {
  const { children, ...rest } = props

  const classes = classnames('kbridh-radios__item')
  return (
    <div className={classes}>
      <input type="radio" className="kbridh-radios__input" {...rest} />
      {children}
    </div>
  )
}

interface RadioLabelProps {
  className?: string
  children?: ReactNode
  htmlFor?: string
}

export const RadioLabel = (props: RadioLabelProps) => {
  const { children, className, ...rest } = props
  const classes = classnames('kbridh-radios__label')
  return (
    <Label className={classes} {...rest}>
      {children}
    </Label>
  )
}

export const RadiosHint = (props: HintProps) => {
  const { children, className } = props
  const classes = classnames(className, 'kbridh-radios__hint')
  return <Hint className={classes}>{children}</Hint>
}
