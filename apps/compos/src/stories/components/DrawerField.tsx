import { Box } from '@mui/material'
import * as React from 'react'
import { DateInput } from './DateInput'
import './drawerfield.css'
import { RadioGroupGeneric } from './RadioGroup'

export function DrawerField() : JSX.Element {
    const [typeTime, setTypeTime] = React.useState<'date' | 'interval'>('date')
    const [minMax, setMinMax] = React.useState('min')
    const [timeValue, setTimeValue] = React.useState('123456')

    function onChangeTypeTime(newValue: string) {
        console.log(newValue)
        const val = (newValue==='interval') ? 'interval' : 'date'
        setTypeTime(val)
    }
    function onChangeMinMax(newValue: string) {
        console.log(newValue)
        setMinMax(newValue)
    }

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto' }}>
            <RadioGroupGeneric labels={['min', 'max', 'value']} onChangeTypeTime={onChangeMinMax}/>
            <RadioGroupGeneric labels={['time', 'interval', 'prev.cl']} onChangeTypeTime={onChangeTypeTime} />
            <DateInput type={typeTime}></DateInput>
        </Box>
    )
}