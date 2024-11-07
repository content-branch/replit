import dynamic from 'next/dynamic';

import { api } from '../utils/api';
import { componentMapping } from '../mapping/component-mapping';

export const DynamicComponent = ({
  entryId,
  contentType,
  locale,
}: {
  entryId: any;
  contentType: any;
  locale: any;
}) => {
  if (!contentType) return;

  const config = componentMapping[contentType];
  if (!config || !config.component) {
    return;
  }

  const DynamicComponent = dynamic(() => Promise.resolve(config.component),{
    ssr: false
  });

  const { data, isLoading } = api.pages.component.useQuery({
    entryId,
    locale,
  });

  const item = data?.items[0] as any; //only one item should be returned as it's a unique id

  if (isLoading) return <div>Loading ....</div>;
  const mappedProps = config.mapEntryToProps(item.fields);

  return <DynamicComponent theme={null} prefix={null} {...mappedProps} />;
};
