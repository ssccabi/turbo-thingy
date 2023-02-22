import { Input, TextField, TextFieldProps } from '@mui/material'
import { IMaskInput } from 'react-imask'
import React, { forwardRef, useEffect, useState } from 'react'
import './dateInput.css'
import { PatternFormat, NumericFormat, InputAttributes, PatternFormatProps } from 'react-number-format'

interface TypeTime {
    type: 'date' | 'interval'
}


export function DateInput({type}: TypeTime) : JSX.Element {
    // const [typeTime, setTypeTime] = useState('date')

    const MuiTextFieldProps : TextFieldProps = {
        variant: 'filled',
        multiline: true,
        label: 'xxxx'
    }
    
    const [typeTime, setTypeTime] = useState('time')

    useEffect(() => {
        console.log('faxva: ', type)
        setTypeTime(type)
    }, [type])
    /* const patternProps: PatternFormatProps = {
        value : type,
        format: (type === 'date') ? '##.##.#### / ##.##' : '###/##/##',
        customInput: {TextField}
    
    } */

    return <PatternFormat
        value = '313132131'
        // value = {(type === 'interval') ? '3232131232132' : '12321321321'}
        mask = '_'
        // value = {(type === 'date') ? '11.11.2022 / 11.12' : '123/12/12'}
        customInput={TextField}
        {...MuiTextFieldProps}
        // format = '##.##.#### / ##.##'
        format = {(typeTime === 'interval') ? '###/##/##' : '##.##.#### / ##.##' }
        
        // {...props}
    ></PatternFormat>
}
