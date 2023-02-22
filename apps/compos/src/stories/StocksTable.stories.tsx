import { StocksTable } from "./components/StocksTable"
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
    title: 'Example/Stocks table',
    component: StocksTable,
} as ComponentMeta<typeof StocksTable>

const Template: ComponentStory<typeof StocksTable> = () => <StocksTable />

export const StocksBasic = Template.bind({})

