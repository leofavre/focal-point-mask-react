import styled from 'styled-components';
import { CENTER } from '../helpers/parsePosition';

export interface WrapperProps {
  clipSides: boolean;
  keepUserRatio: boolean;
  minWidth: number;
  minHeight: number;
  top: number;
  left: number;
  ratio: number;
}

const Wrapper = styled.div<Partial<WrapperProps>>`
  position: relative;
  display: block;
  overflow: hidden;

  img, video {
    position: absolute;
    display: block;
    width: ${({ clipSides }) => clipSides ? 'auto' : '100%'};
    min-width: ${({ minWidth = 0 }) => `${minWidth}px`};
    height: ${({ clipSides }) => clipSides ? '100%' : 'auto'};
    min-height: ${({ minHeight = 0 }) => `${minHeight}px`};
    top: ${({ top = CENTER }) => `${top}%`};
    left: ${({ left = CENTER }) => `${left}%`};
    transform: ${({ top = CENTER, left = CENTER }) =>
      `translate(${left * -1}%, ${top * -1}%)`};
    aspect-ratio: ${({ keepUserRatio, ratio }) => keepUserRatio && ratio
      ? `${ratio}/1`
      : ''
    };
  }

  picture {
    position: static;
  }
`;

export default Wrapper;
