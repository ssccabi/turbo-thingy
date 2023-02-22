import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DateInput } from './components/DateInput';

export default {
    title: 'Example/Date input',
    component: DateInput,
} as ComponentMeta<typeof DateInput>

const Template: ComponentStory<typeof DateInput> = (args) => <DateInput {... args} />

export const TypeDate = Template.bind({})
TypeDate.args = {
    type: 'date'
}

/* export const TypeInterval = Template.bind({})
TypeDate.args = {
    type: 'interval'
} */