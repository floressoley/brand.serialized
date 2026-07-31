import type { HTMLAttributes, ReactNode, TdHTMLAttributes } from 'react'
import './Table.css'

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  children: ReactNode
}

export function Table({ className, children, ...rest }: TableProps) {
  return (
    <div className="table-wrap">
      <table className={['table', className].filter(Boolean).join(' ')} {...rest}>
        {children}
      </table>
    </div>
  )
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Use for hashes, addresses, numeric values, timestamps — renders in Rotobo Mono */
  mono?: boolean
  children?: ReactNode
}

export function TableCell({ mono = false, className, children, ...rest }: TableCellProps) {
  const classes = [mono ? 'table__cell--mono' : '', className].filter(Boolean).join(' ')
  return (
    <td className={classes} {...rest}>
      {children}
    </td>
  )
}

Table.Head = function TableHead({ children, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...rest}>{children}</thead>
}

Table.Body = function TableBody({ children, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...rest}>{children}</tbody>
}

Table.Row = function TableRow({ children, ...rest }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr {...rest}>{children}</tr>
}

Table.Cell = TableCell
