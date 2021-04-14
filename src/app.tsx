import React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import FocalPointMask from './component/FocalPointMask';

const AppWrapper = styled.div`
  > * {
    display: block;
    margin: auto;
    width: 100%;
    max-width: 100%;
    height: 450px;
    resize: both;
    overflow: hidden;
  }
`;

const App = () => (
  <AppWrapper>
    <FocalPointMask focalPoint="35% 75%" mediaRatio="16/9" mediaMinWidth={700}>
      <img src="https://picsum.photos/id/1012/3840/2160"/>
    </FocalPointMask>

    <FocalPointMask focalPoint="center" mediaRatio="16/9">
      <video autoPlay muted loop>
        <source src="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1280_10MG.mp4"/>
      </video>
    </FocalPointMask>
  </AppWrapper>
);

render(<App />, document.getElementById('root'));
