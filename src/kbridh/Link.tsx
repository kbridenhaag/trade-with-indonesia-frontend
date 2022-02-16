import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import classnames from 'classnames'
import { PropsWithChildren } from 'react'

interface LinkProps extends PropsWithChildren<NextLinkProps> {
  className?: string
  tabIndex?: number
}

export const Link = (props: LinkProps) => {
  const { className, children, tabIndex, ...rest } = props

  const classes = classnames('govuk-link', className)

  return (
    <NextLink {...rest} passHref>
      <a tabIndex={tabIndex} className={classes}>
        {children}
      </a>
    </NextLink>
  )
}
