import { HTMLAttributes, PropsWithChildren } from 'react'
import classnames from 'classnames'
import { WidthContainer } from './WidthContainer'
import { GridRow } from './GridRow'
import { GridColumn } from './GridColumn'

interface MastheadProps
  extends PropsWithChildren<HTMLAttributes<HTMLElement>> {}

export const Masthead = (props: MastheadProps) => {
  const { children, className } = props
  const classes = classnames('app-masthead', className)

  return (
    <div className={classes}>
      <WidthContainer>{children}</WidthContainer>
    </div>
  )
}
