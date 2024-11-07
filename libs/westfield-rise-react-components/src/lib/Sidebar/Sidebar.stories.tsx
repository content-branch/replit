import type { Meta } from '@storybook/react';
import { Sidebar } from './index';
import { ReactNode, useEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';

const Story: Meta<typeof Sidebar> = {
  title: 'Sidebar',
  component: Sidebar,
  argTypes: {
    position: {
      control: {
        type: 'select',
      },
      options: ['left', 'right'],
    },
    isOpen: {
      type: 'boolean',
    },
  },
} as Meta<typeof Sidebar>;

export default Story;

const Template = (
  args: JSX.IntrinsicAttributes &
    Pick<
      {
        id?: string | undefined;
        children?: ReactNode;
        isOpen?: boolean | undefined;
        setIsOpen?: ((showSidebar: boolean) => void) | undefined;
        position?: 'left' | 'right' | undefined;
        className?: string | undefined;
      },
      'id' | 'children' | 'setIsOpen' | 'className'
    > & {
      isOpen?: boolean | undefined;
      position?: 'left' | 'right' | undefined;
    },
) => {
  const [opened, setIsOpen] = useState(args.isOpen ?? false);
  useEffect(() => {
    setIsOpen(args.isOpen ?? false);
  }, [args.isOpen]);
  return (
    <div
      style={{
        height: '80vh',
        width: '80vw',
      }}
    >
      <Sidebar {...args} isOpen={opened} setIsOpen={o => setIsOpen(o)}>
        Anything goes here
      </Sidebar>
      <div>something under the sidebar</div>
    </div>
  );
};

export const SidebarComponent = Template.bind({
  args: {
    title: 'Sidebar Title',
    children: 'Sidebar content here',
  },
});
