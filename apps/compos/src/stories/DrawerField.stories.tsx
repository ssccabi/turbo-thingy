import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DrawerField } from './components/DrawerField';

export default {
    title: 'Example/Time drawer field',
    component: DrawerField,
} as ComponentMeta<typeof DrawerField>

const Template: ComponentStory<typeof DrawerField> = () => <DrawerField />

export const TimeDrawerField = Template.bind({})
TimeDrawerField.args = {}
/* export const TimeDrawerField = Template.bind({})
TimeRadioLabels.args = {
    labels: ['date', 'time', 'interval']
}
export const ConditionRadioLabels = Template.bind({})
ConditionRadioLabels.args = {
    labels: ['min', 'max', 'value']
}
 */