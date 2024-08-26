import { forwardRef } from 'react'

import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input, { InputProps } from '@mui/joy/Input'
import cn from 'classnames'

import { Typography } from '@/ui-components/typography'

import styles from './styles.module.scss'

type Props = InputProps & {
  label?: string
  className?: string
  errorMessage?: string
}

const CustomInput = forwardRef<HTMLInputElement, Props>(
  (
    { label, name, placeholder, value, variant, className, errorMessage, onChange, ...props },
    ref,
  ) => {
    return (
      <FormControl className={styles['form-control']}>
        <FormLabel>{label}</FormLabel>

        <Input
          ref={ref}
          variant={variant}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className={cn(styles['search-field'], className)}
          {...props}
        />

        <Typography className={styles['error-message']}>{errorMessage && errorMessage}</Typography>
      </FormControl>
    )
  },
)

export { CustomInput }
