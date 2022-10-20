import React, {FunctionComponent, ReactElement, useEffect, useState} from "react";
import {
  MissingConfigPlaceholder,
  useCheckboxField,
  useColorField,
  useFontField,
  useSelectField
} from "@modbros/dashboard-sdk";
import styled from "styled-components";

const StyledClockWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`

function formatTimePart(part: string | number): string {
  return part.toString().padStart(2, '0');
}

function format24h(now: Date, hideSeconds: boolean): string {
  const hours = formatTimePart(now.getHours());
  const minutes = formatTimePart(now.getMinutes());
  const seconds = formatTimePart(now.getSeconds());

  const parts = [hours, minutes]

  if (!hideSeconds) {
    parts.push(seconds)
  }

  return parts.join(':')
}

function format12h(now: Date, hideSeconds: boolean): string {
  const suffix = now.getHours() < 12 ? ' AM' : ' PM'
  const h = now.getHours() % 12
  const hours = formatTimePart(h ? h : 12);
  const minutes = formatTimePart(now.getMinutes());
  const seconds = formatTimePart(now.getSeconds());

  const parts = [hours, minutes]

  if (!hideSeconds) {
    parts.push(seconds)
  }

  return `${parts.join(':')}${suffix}`
}

const Digital: FunctionComponent = () => {
  const [now, setNow] = useState<Date>(new Date())
  const format = useSelectField({field: 'format', defaultValue: '24h'});
  const hideSeconds = useCheckboxField({field: 'hide_seconds'})
  const color = useColorField({field: 'text_color', defaultColor: '#000000'})
  const fontFamily = useFontField({field: 'font_family'})

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(interval)
    }
  })

  let content: ReactElement | string = <MissingConfigPlaceholder text='Please select a valid format'/>

  if (format === '24h') {
    content = format24h(now, hideSeconds)
  }

  if (format === '12h') {
    content = format12h(now, hideSeconds)
  }

  return (
    <StyledClockWrapper style={{
      color: color.toRgbaCss(),
      fontFamily: fontFamily
    }}>
      {content}
    </StyledClockWrapper>
  )
}

export default Digital
