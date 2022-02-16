import classnames from 'classnames'
import Link from 'next/link'
import { HTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  as: 'button' | 'internalHref' | 'externalHref'
  children?: ReactNode
  start?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  href?: string
  color?: 'secondary' | 'inverted' | 'warning'
}

export const Button = (props: ButtonProps) => {
  const {
    as = 'externalHref',
    children,
    start = false,
    className,
    type = 'submit',
    href = '#',
    color,
    ...rest
  } = props

  const classes = classnames(className, 'kbridh-button', {
    'kbridh-button--start': start,
    'kbridh-button--secondary': color === 'secondary',
    'kbridh-button--warning': color === 'warning',
    'app-button--inverted': color === 'inverted'
  })

  switch (as) {
    case 'button':
      return (
        <button className={classes} type={type} {...rest}>
          {children}
        </button>
      )
    case 'internalHref':
      return (
        <Link href={href} passHref>
          <a className={classes} href={href}>
            {children}
          </a>
        </Link>
      )
    default:
      return (
        <a className={classes} href={href}>
          {children}
        </a>
      )
  }
}
