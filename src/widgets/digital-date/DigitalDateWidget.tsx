import React, { FunctionComponent } from 'react'
import { useSelectField, useSystemTime } from '@modbros/dashboard-sdk'
import { DigitalWrapper } from '../../components/DigitalWrapper'

function formatDatePart(part: string | number): string {
  return part.toString().padStart(2, '0')
}

function formatDate(now: Date, format: string, separator: string): string {
  const date = formatDatePart(now.getDate())
  const month = formatDatePart(now.getMonth() + 1)
  const year = now.getFullYear().toString()

  return format
    .replace('Y', year)
    .replace('M', month)
    .replace('D', date)
    .replaceAll('-', separator)
}

const DigitalDateWidget: FunctionComponent = () => {
  const now = useSystemTime({
    refreshInterval: 60_000
  })
  const format = useSelectField({ field: 'format', defaultValue: 'Y-M-D' })
  const separator = useSelectField({ field: 'separator', defaultValue: '-' })

  if (!now) {
    return null
  }

  return <DigitalWrapper>{formatDate(now, format, separator)}</DigitalWrapper>
}

export default DigitalDateWidget
