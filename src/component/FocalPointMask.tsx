import React, { useState, useRef, useLayoutEffect, PropsWithChildren, HTMLAttributes } from 'react';
import useResizeObserver from '@react-hook/resize-observer';
import Wrapper from './Wrapper';
import getMediaRatio from '../helpers/getMediaRatio';
import parseAspectRatio from '../helpers/parseAspectRatio';
import parsePosition, { CENTER } from '../helpers/parsePosition';
import type { WrapperProps } from './Wrapper';

interface FocalPointMaskProps extends HTMLAttributes<HTMLDivElement> {
  focalPoint?: string;
  mediaRatio?: string;
  mediaMinWidth?: number;
  mediaMinHeight?: number;
}

const FocalPointMask = (props: PropsWithChildren<FocalPointMaskProps>) => {
  const {
    focalPoint,
    mediaRatio,
    mediaMinWidth,
    mediaMinHeight,
    children,
    ...restProps
  } = props;

  const maskElement = useRef<HTMLDivElement>(null);
  const userRatio = parseAspectRatio(mediaRatio);

  const [maskRatio, setMaskRatio] = useState<number>();
  const [ratio, setRatio] = useState<number | undefined>(userRatio);
  const [keepUserRatio, setKeepUserRatio] = useState<boolean>(true);
  const [wrapperProps, setWrapperProps] = useState<WrapperProps>();

  const handleEveryLoad = ({ target }) => {
    const naturalRatio = getMediaRatio(target);
    const ratio = userRatio || naturalRatio || undefined;
    setRatio(ratio);
    setKeepUserRatio(userRatio !== naturalRatio);
  };

  useResizeObserver(maskElement, () => {
    const { offsetWidth, offsetHeight } = maskElement.current || {};
    if (offsetWidth != null && offsetHeight != null) {
      setMaskRatio(offsetWidth / offsetHeight);
    }
  });

  useLayoutEffect(() => {
    if (maskRatio != null && ratio != null) {
      const clipSides = maskRatio < ratio;
      const [top = CENTER, left = CENTER] = parsePosition(focalPoint) || [];

      const minWidth = Math.max(
        mediaMinWidth || 0,
        (mediaMinHeight || 0) * ratio
      );

      const minHeight = Math.max(
        (mediaMinWidth || 0) / ratio,
        mediaMinHeight || 0
      );

      setWrapperProps({
        clipSides,
        keepUserRatio: Boolean(keepUserRatio),
        minWidth,
        minHeight,
        top,
        left,
        ratio
      });
    }
  }, [
    focalPoint,
    ratio,
    keepUserRatio,
    maskRatio,
    mediaMinWidth,
    mediaMinHeight
  ]);

  return (
    <Wrapper
      ref={maskElement}
      onLoad={handleEveryLoad}
      onLoadedMetadata={handleEveryLoad}
      {...wrapperProps}
      {...restProps}
    >
      {children}
    </Wrapper>
  );
};

export default FocalPointMask;
