import { HTMLAttributes, PropsWithChildren, ThHTMLAttributes } from 'react'
import classnames from 'classnames'

interface TableProps
  extends PropsWithChildren<HTMLAttributes<HTMLTableElement>> {
  caption?: string
}

export const Table = (props: TableProps) => {
  const { className, caption, children, ...rest } = props

  const classes = classnames('kbridh-table', className)

  return (
    <table className={classes} {...rest}>
      {caption ? (
        <caption className="kbridh-table__caption kbridh-table__caption--m"></caption>
      ) : null}
      {children}
    </table>
  )
}

interface TableHeadProps
  extends PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>> {}

export const TableHead = ({ children, className, ...rest }: TableHeadProps) => {
  const classes = classnames('kbridh-table__head', className)

  return (
    <thead className={classes} {...rest}>
      {children}
    </thead>
  )
}

interface TableRowProps
  extends PropsWithChildren<HTMLAttributes<HTMLTableRowElement>> {}

export const TableRow = ({ children, className, ...rest }: TableRowProps) => {
  const classes = classnames(className, 'kbridh-table__row')

  return (
    <tr className={classes} {...rest}>
      {children}
    </tr>
  )
}

interface TableHeaderProps
  extends PropsWithChildren<ThHTMLAttributes<HTMLTableHeaderCellElement>> {}

export const TableHeader = ({
  children,
  className,
  ...rest
}: TableHeaderProps) => {
  const classes = classnames('kbridh-table__header', className)

  return (
    <th className={classes} {...rest}>
      {children}
    </th>
  )
}

interface TableDataProps
  extends PropsWithChildren<HTMLAttributes<HTMLTableCellElement>> {}

export const TableDataCell = ({
  children,
  className,
  ...rest
}: TableDataProps) => {
  const classes = classnames('kbridh-table__cell', className)

  return (
    <td className={classes} {...rest}>
      {children}
    </td>
  )
}

interface TableBodyProps
  extends PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>> {}

export const TableBody = ({ children, className, ...rest }: TableBodyProps) => {
  const classes = classnames('kbridh-table__body', className)

  return (
    <tbody className={classes} {...rest}>
      {children}
    </tbody>
  )
}
