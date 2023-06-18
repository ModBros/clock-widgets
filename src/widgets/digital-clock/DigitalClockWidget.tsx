import React, {
  FunctionComponent,
  ReactElement,
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

function formatTimePart(part: string | number): string {
  return part.toString().padStart(2, '0')
}

function format24h(now: Date, hideSeconds: boolean): string {
  const hours = formatTimePart(now.getHours())
  const minutes = formatTimePart(now.getMinutes())
  const seconds = formatTimePart(now.getSeconds())

  const parts = [hours, minutes]

  if (!hideSeconds) {
    parts.push(seconds)
  }

  return parts.join(':')
}

function format12h(now: Date, hideSeconds: boolean): string {
  const suffix = now.getHours() < 12 ? ' AM' : ' PM'
  const h = now.getHours() % 12
  const hours = formatTimePart(h ? h : 12)
  const minutes = formatTimePart(now.getMinutes())
  const seconds = formatTimePart(now.getSeconds())

  const parts = [hours, minutes]

  if (!hideSeconds) {
    parts.push(seconds)
  }

  return `${parts.join(':')}${suffix}`
}

const DigitalClockWidget: FunctionComponent = () => {
  const now = useSystemTime()
  const format = useSelectField({ field: 'format', defaultValue: '24h' })
  const hideSeconds = useCheckboxField({ field: 'hide_seconds' })

  if (!now) {
    return null
  }

  let content: ReactElement | string = (
    <MissingConfigPlaceholder text='Please select a valid format' />
  )

  if (format === '24h') {
    content = format24h(now, hideSeconds)
  }

  if (format === '12h') {
    content = format12h(now, hideSeconds)
  }

  return <DigitalWrapper>{content}</DigitalWrapper>
}

export default DigitalClockWidget
