import { Entry } from 'contentful';
import { componentMapping } from '../mapping/component-mapping';
import { filterableSortableListContentType } from '../utils/constants';
import dynamic from 'next/dynamic';

type AsyncComponentProps = {
  entry: Entry<any>;
  theme?: string;
  prefix?: string;
  contentType?: string;
  locale?: string;
};

const DynamicFilterableSortableList = dynamic(
  () => import('../components/FilterableSortableList'),
  { ssr: false },
);
const AsyncComponent = ({
  entry,
  theme,
  prefix,
  contentType,
  locale,
}: AsyncComponentProps) => {
  if (!contentType) return;

  if (contentType === filterableSortableListContentType) {
    const key = `${entry.sys.id}-${contentType}`;
    return (
      <DynamicFilterableSortableList
        key={key}
        entry={entry}
        theme={theme}
        locale={locale!}
        prefix={prefix!}
      />
    );
  }

  const config = componentMapping[contentType];
  if (!config || !config.component) {
    return;
  }

  const Component = config.component;

  if (!Component) {
    return;
  }

  try {
    const mappedProps = config.mapEntryToProps(entry.fields);

    return <Component theme={theme} prefix={prefix} {...mappedProps} />;
  } catch (e) {
    return null;
  }
};

export default AsyncComponent;
