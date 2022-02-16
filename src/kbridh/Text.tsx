import classnames from 'classnames'
import React from 'react'

type TextSize =
  | 'body-s'
  | 'body-m'
  | 'body-l'
  | 'heading-s'
  | 'heading-m'
  | 'heading-l'
  | 'heading-xl'

interface Props<C extends React.ElementType> {
  /**
   * An override of the default HTML tag.
   * Can also be another React component. 😉
   */
  as?: C
  size?: TextSize
  children?: React.ReactNode
  className?: string
}

type TextProps<C extends React.ElementType> = Props<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof Props<C>>

export const Text = <C extends React.ElementType = 'p'>({
  as,
  children,
  className,
  size,
  ...other
}: TextProps<C>) => {
  const Component = as || 'p'
  const textSize = size || 'body-m'

  const classes = classnames(
    {
      'kbridh-body-s': textSize === 'body-s',
      'kbridh-body': textSize === 'body-m',
      'kbridh-body-l': textSize === 'body-l',
      'app-heading-s': textSize === 'heading-s',
      'app-heading-m': textSize === 'heading-m',
      'app-heading-l': textSize === 'heading-l',
      'app-heading-xl': textSize === 'heading-xl'
    },
    className
  )

  return (
    <Component className={classes} {...other}>
      {children}
    </Component>
  )
}
