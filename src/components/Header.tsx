import { HTMLAttributes, ReactNode } from 'react'
import { WidthContainer } from '../kbridh/WidthContainer'
import classnames from 'classnames'
import Link from 'next/link'
import { Logo } from './Logo'

interface HeaderMenuItemProps {
  children?: ReactNode
  href: string
}

const HeaderMenuItem = (props: HeaderMenuItemProps) => {
  const { children, href } = props

  return (
    <Link href={href} passHref>
      <a className="app-header__link">{children}</a>
    </Link>
  )
}

const menuItems = [
  {
    title: 'Find Suppliers',
    href: '/suppliers'
  },
  {
    title: 'Find importers',
    href: '/importers'
  },
  {
    title: 'Publications',
    href: '/publications'
  }
]

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  className?: string
  inverse?: boolean
}

export const Header = (props: HeaderProps) => {
  const { className, inverse = false } = props
  const classes = classnames('app-header', className, {
    'app-header--inverse': inverse
  })

  return (
    <header className={classes}>
      <WidthContainer>
        <div className="app-header__container">
          <Link href="/" passHref>
            <a className="app-header__title app-header__link">
              <Logo className="app-header__logo" />
            </a>
          </Link>
          <nav className="app-header__nav">
            <ul className="app-header__menu">
              {menuItems.map((menuItem, idx) => (
                <li className="app-header__menu-item" key={`menu-item-${idx}`}>
                  <HeaderMenuItem href={menuItem.href}>
                    {menuItem.title}
                  </HeaderMenuItem>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </WidthContainer>
    </header>
  )
}
