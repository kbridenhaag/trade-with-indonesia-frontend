import classnames from 'classnames'
import { DOMAttributes } from 'react'

interface TextInputProps extends DOMAttributes<HTMLInputElement> {
  className?: string
  name?: string
  id?: string
  type?: string
  error?: boolean
  hasErrorMessage?: boolean
  width?: 'full' | 20 | 10
}

export const TextInput = (props: TextInputProps) => {
  const {
    className,
    name,
    id,
    type = 'text',
    error = false,
    width = 'full',
    hasErrorMessage = false,
    ...rest
  } = props

  const classes = classnames('kbridh-input', className, {
    'kbridh-input--error': error,
    'kbridh-input--width-20': width === 20,
    'kbridh-input--width-10': width === 10
  })

  return (
    <input
      type={type}
      id={id || name}
      name={name || id}
      className={classes}
      {...(hasErrorMessage && {
        'aria-describedby': `${name}-error`
      })}
      {...rest}
    />
  )
}
