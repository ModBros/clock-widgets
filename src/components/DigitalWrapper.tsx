import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import {
  useColorField,
  useFontField,
  useNumberField,
  useSelectField
} from '@modbros/dashboard-sdk'

const StyledClockWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

export const DigitalWrapper = (props: PropsWithChildren) => {
  const { children } = props
  const color = useColorField({ field: 'text_color', defaultColor: '#000000' })
  const fontFamily = useFontField({ field: 'font_family' })
  const justifyContent = useSelectField({
    field: 'align_horizontal',
    defaultValue: 'center'
  })
  const alignItems = useSelectField({
    field: 'align_vertical',
    defaultValue: 'center'
  })
  const fontSize = useNumberField({ field: 'font_size', defaultValue: null })

  return (
    <StyledClockWrapper
      style={{
        color: color.toRgbaCss(),
        fontSize: fontSize ? `${fontSize}px` : null,
        fontFamily,
        alignItems,
        justifyContent
      }}
    >
      {children}
    </StyledClockWrapper>
  )
}
