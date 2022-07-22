import React from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import {checkIsActive, KTSVG, toAbsoluteUrl} from '../../../helpers'
import {useLayout} from '../../core'

type Props = {
  to: string
  title: string
  icon?: string
  fontIcon?: string
  hasIcon?: boolean
  hasBullet?: boolean
}

const AsideMenuItem: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
  hasIcon
}) => {
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)
  const {config} = useLayout()
  const {aside} = config

  return (
    <div className='menu-item'>
      <Link className={clsx('menu-link without-sub', {active: isActive})} to={to}>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {hasIcon && icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon '>
            <KTSVG path={icon} className='svg-icon-2x' />
          </span>
        )}
        {!hasIcon && icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon '>
            <img alt={title} className='svg-icon-2x' src={toAbsoluteUrl(`${icon}`)} /> 
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && <i className={clsx('bi fs-3', fontIcon)}></i>}
        <span className='menu-title fs-6'>{title}</span>
      </Link>
      {children}
    </div>
  )
}

export {AsideMenuItem}
