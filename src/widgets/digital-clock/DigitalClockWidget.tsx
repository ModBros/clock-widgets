import React, {
  FunctionComponent,
  ReactElement,
  ReactNode,
  useEffect,
  useState
} from 'react'
import {
  MissingConfigPlaceholder,
  useCheckboxField,
  useSelectField,
  useSystemTime
} from '@modbros/dashboard-sdk'
import { DigitalWrapper } from '../../components/DigitalWrapper'

function formatTimePart(part: string | number, noLeadingZero = false): string {
  if (noLeadingZero) {
    return part.toString()
  }

  return part.toString().padStart(2, '0')
}

function format24h(
  now: Date,
  hideSeconds: boolean,
  noLeadingZero: boolean
): string {
  const hours = formatTimePart(now.getHours(), noLeadingZero)
  const minutes = formatTimePart(now.getMinutes())
  const seconds = formatTimePart(now.getSeconds())

  const parts = [hours, minutes]

  if (!hideSeconds) {
    parts.push(seconds)
  }

  return parts.join(':')
}

function format12h(
  now: Date,
  hideSeconds: boolean,
  hideSuffix: boolean,
  noLeadingZero: boolean
): string {
  const suffix = now.getHours() < 12 ? ' AM' : ' PM'
  const h = now.getHours() % 12
  const hours = formatTimePart(h ? h : 12, noLeadingZero)
  const minutes = formatTimePart(now.getMinutes())
  const seconds = formatTimePart(now.getSeconds())

  const parts = [hours, minutes]

  if (!hideSeconds) {
    parts.push(seconds)
  }

  const time = parts.join(':')

  if (hideSuffix) {
    return time
  }

  return `${time}${suffix}`
}

const DigitalClockWidget: FunctionComponent = () => {
  const now = useSystemTime()
  const format = useSelectField({ field: 'format', defaultValue: '24h' })
  const hideSeconds = useCheckboxField({ field: 'hide_seconds' })
  const hideSuffix = useCheckboxField({ field: 'hide_suffix' })
  const noLeadingZero = useCheckboxField({ field: 'no_leading_zero' })

  if (!now) {
    return null
  }

  let content: ReactNode = (
    <MissingConfigPlaceholder text='Please select a valid format' />
  )

  if (format === '24h') {
    content = format24h(now, hideSeconds, noLeadingZero)
  }

  if (format === '12h') {
    content = format12h(now, hideSeconds, hideSuffix, noLeadingZero)
  }

  return <DigitalWrapper>{content}</DigitalWrapper>
}

export default DigitalClockWidget
