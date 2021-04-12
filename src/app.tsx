import React from 'react';
import { render } from 'react-dom';
import FocalPointMaskReact from './component/FocalPointMask';

const App = () => {
  const VIDEO_SRC = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/' +
    'h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4';

  return (
    <>
      <FocalPointMaskReact
        focalPoint={[44, 75]}
        preloadRatio={1.5}
        style={{ width: '100%', height: 500, resize: 'both' }}
      >
        <img src="https://picsum.photos/id/1012/3973/2639"/>
      </FocalPointMaskReact>

      <FocalPointMaskReact
        focalPoint={[30, 48]}
        style={{ width: '100%', height: 500, resize: 'both' }}
      >
        <picture>
          <source srcSet="https://picsum.photos/id/1011/5472/3648"/>
          <img src="https://picsum.photos/id/1011/5472/3648"/>
        </picture>
      </FocalPointMaskReact>

      <FocalPointMaskReact
        style={{ width: '100%', height: 500, resize: 'both' }}
      >
        <video src={VIDEO_SRC}></video>
      </FocalPointMaskReact>
    </>
  );
};

render(<App />, document.getElementById('root'));
