import classnames from 'classnames'
import { ReactNode } from 'react'

interface FormGroupsProps {
  children?: ReactNode
  className?: string
  error?: boolean
}

export const FormGroup = (props: FormGroupsProps) => {
  const { children, className, error = false } = props
  const classes = classnames(className, 'kbridh-form-group', {
    'kbridh-form-group--error': error
  })

  return <div className={classes}>{children}</div>
}
