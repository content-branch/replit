import { StoryFn } from '@storybook/react';
import { EnvironmentContext } from '../contexts/EnvironmentContext';
import Link from 'next/link';
import Image from 'next/image';

export const environmentContextDecorator = (Story: StoryFn) => (
  <EnvironmentContext.Provider value={{ Link, Image }}>
    <Story />
  </EnvironmentContext.Provider>
);

