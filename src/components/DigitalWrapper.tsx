import React, {FunctionComponent} from "react";
import styled from "styled-components";
import {useColorField, useFontField, useSelectField} from "@modbros/dashboard-sdk";

const StyledClockWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

export const DigitalWrapper: FunctionComponent = (props) => {
  const {children} = props;
  const color = useColorField({field: 'text_color', defaultColor: '#000000'})
  const fontFamily = useFontField({field: 'font_family'})
  const alignHorizontal = useSelectField({field: 'align_horizontal', defaultValue: 'center'})
  const alignVertical = useSelectField({field: 'align_vertical', defaultValue: 'center'})

  return (
    <StyledClockWrapper
      style={{
        color: color.toRgbaCss(),
        fontFamily: fontFamily,
        alignItems: alignVertical,
        justifyContent: alignHorizontal
      }}
    >
      {children}
    </StyledClockWrapper>
  )
}
