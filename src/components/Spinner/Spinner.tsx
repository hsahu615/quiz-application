import React from 'react';
import DotLoader from 'react-spinners/DotLoader';

const override: React.CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

const Spinner = ({ loading }: any) => {
  return (
    <div className='sweet-loading'>
      {loading ? (
        <>
          <DotLoader
            cssOverride={override}
            size={70}
            color={'white'}
            speedMultiplier={1.5}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
          <p className='text-center text-white my-2'>
            Wait for quiz to start...
          </p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Spinner;
