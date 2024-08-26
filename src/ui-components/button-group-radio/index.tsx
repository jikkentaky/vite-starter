import { FC } from 'react'

import { Box, ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps } from '@mui/material'

import styles from './styles.module.scss'

type ToggleButtonOption = {
  value: string
  label: string
}

type Props = Omit<ToggleButtonGroupProps, 'onChange'> & {
  isExclusive?: boolean
  buttons: ToggleButtonOption[]
  label?: string
  handleChange: (event: React.MouseEvent<HTMLElement>, newValue: string | null) => void
}

const ButtonGroupRadio: FC<Props> = ({
  buttons,
  value,
  className,
  label,
  isExclusive = true,
  handleChange,
  ...props
}) => {
  return (
    <Box className={styles.wrapper}>
      <label htmlFor="buttonGroup">{label}</label>

      <ToggleButtonGroup
        color="primary"
        value={value}
        exclusive={isExclusive}
        onChange={handleChange}
        aria-label="buttonGroup"
        className={className}
        sx={{
          '.MuiToggleButton-root': {
            backgroundColor: '#21B3C1',
            color: '#fff',
            fontWeight: 600,
            borderRadius: 0,
          },
          '.Mui-selected': {
            backgroundColor: '#237e86 !important',
            color: '#fff !important',
          },
        }}
        {...props}
      >
        {buttons.map(({ value, label }) => (
          <ToggleButton key={value} value={value} className={styles.button}>
            {label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  )
}

export { ButtonGroupRadio }
