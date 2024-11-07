import { ColorRing } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="block-loading"
        colors={['#7a8cf0', '#ff833b', '#fcdb57', '#1ce19f', '#fa5e99']}
      />
    </div>
  );
};
