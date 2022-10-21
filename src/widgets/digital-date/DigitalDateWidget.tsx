import React, {FunctionComponent, useEffect, useState} from "react";
import {useSelectField} from "@modbros/dashboard-sdk";
import {DigitalWrapper} from "../../components/DigitalWrapper";

function formatDatePart(part: string | number): string {
  return part.toString().padStart(2, '0');
}

function formatDate(now: Date, format: string, separator: string): string {
  const date = formatDatePart(now.getDate())
  const month = formatDatePart(now.getMonth())
  const year = now.getFullYear().toString()

  return format
    .replace('Y', year)
    .replace('M', month)
    .replace('D', date)
    .replaceAll('-', separator)
}

const DigitalDateWidget: FunctionComponent = () => {
  const [now, setNow] = useState<Date>(new Date())
  const format = useSelectField({field: 'format', defaultValue: 'Y-M-D'});
  const separator = useSelectField({field: 'separator', defaultValue: '-'})

  useEffect(() => {
    const interval = setInterval(() => {
      const newNow = new Date();
      if (now.toDateString() !== newNow.toDateString()) {
        setNow(newNow);
      }
    }, 60_000);

    return () => {
      clearInterval(interval)
    }
  }, [now])

  return (
    <DigitalWrapper>
      {formatDate(now, format, separator)}
    </DigitalWrapper>
  )
}

export default DigitalDateWidget
