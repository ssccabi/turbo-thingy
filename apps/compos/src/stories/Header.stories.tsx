import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Header } from './components/Header';

export default {
  title: 'Example/Header',
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header />;

export const HeaderBasic  = Template.bind({});
