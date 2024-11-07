import ReferencePoints from '../ReferencePoints/ReferencePoints';
import BodyCopy, { BodyCopyProps } from '../BodyCopy/BodyCopy';

interface BodyCopyListProps {
  title: string;
  text: BodyCopyProps;
}

export interface BodyCopyComboListProps {
  bodyCopyList: BodyCopyListProps[];
}

export function BodyCopyComboList(props: BodyCopyComboListProps) {
  const { bodyCopyList } = props;
  const mappedLinkTitles = bodyCopyList.map(item => item.title);
  const mappedBodyCopyList = bodyCopyList.map(item => item.text);

  const ReferencePointId = 'referencePoints';

  const handleOnClick = (reference: string) => {
    const bodyCopy = document.getElementById(
      reference.replace(/\s+/g, '-').toLowerCase(),
    );
    if (bodyCopy) {
      bodyCopy.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <ReferencePoints
        referenceList={mappedLinkTitles}
        onClick={handleOnClick}
        id={ReferencePointId}
      />
      <div id="bottom">
        {mappedBodyCopyList.map((bodyCopy, index) => (
          <BodyCopy
            key={index}
            title={bodyCopy.title}
            bodyCopyText={bodyCopy.bodyCopyText}
          />
        ))}
      </div>
    </div>
  );
}

export default BodyCopyComboList;
