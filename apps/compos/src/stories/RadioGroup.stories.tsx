import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RadioGroupGeneric } from './components/RadioGroup';

export default {
    title: 'Example/Radio group',
    component: RadioGroupGeneric,
} as ComponentMeta<typeof RadioGroupGeneric>

const Template: ComponentStory<typeof RadioGroupGeneric> = (args) => <RadioGroupGeneric {... args} />

export const TimeRadioLabels = Template.bind({})
TimeRadioLabels.args = {
    labels: ['date', 'time', 'interval']
}
export const ConditionRadioLabels = Template.bind({})
ConditionRadioLabels.args = {
    labels: ['min', 'max', 'value']
}
/* export const TypeInterval = Template.bind({})
TypeDate.args = {
    type: 'interval'
} */