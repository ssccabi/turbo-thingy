import { Input, TextField, TextFieldProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import { IMaskInput } from 'react-imask'
import React, { ComponentType, forwardRef, useEffect, useState } from 'react'
import './dateInput.css'
import { PatternFormat, NumericFormat, InputAttributes, PatternFormatProps } from 'react-number-format'

interface TypeTime {
    type: 'date' | 'interval'
}


export function DateInput({type}: TypeTime) : JSX.Element {
    // const [typeTime, setTypeTime] = useState('date')

    const muiTextFieldProps : TextFieldProps = {
        variant: 'filled',
        multiline: true,
        label: 'xxxx'
    }
    const InputTextField : ComponentType = styled(TextField)<TextFieldProps>(({theme}) => ({
        variant: 'outlined',
        multiline: true,
        label: 'xxxx'
    }))
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
        // value = {313132131}

        value = {(type === 'interval') ? '1231212' : '121212341212'}
        mask = '_'
        // value = {(type === 'date') ? '11.11.2022 / 11.12' : '123/12/12'}
        // format = '##.##.#### / ##.##'
        format = {(typeTime === 'interval') ? '###/##/##' : '##.##.#### / ##.##' }
        customInput = {InputTextField}
        /* {...muiTextFieldProps}
         */
        // {...props}
    ></PatternFormat>
}
