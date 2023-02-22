import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DrawerPane } from './components/DrawerPane';

export default {
  title: 'Example/Drawer pane',
  component: DrawerPane,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof DrawerPane>;

const Template: ComponentStory<typeof DrawerPane> = (args) => <DrawerPane  {...args}/>;

export const DrawerPaneFields  = Template.bind({});
