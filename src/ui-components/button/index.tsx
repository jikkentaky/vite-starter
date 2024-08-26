import { ButtonHTMLAttributes, FC } from 'react'

import cn from 'classnames'

import styles from './styles.module.scss'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
}

const Button: FC<Props> = ({ type, disabled, content, className, children, ...props }) => {
  return (
    <button
      className={cn(styles.button, className, { [styles.disabled]: disabled })}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export { Button }
