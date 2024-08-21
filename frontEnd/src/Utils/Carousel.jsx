import React, { useRef, useEffect, PropsWithChildren } from 'react';

import { Carousel as NativeCarousel } from '@fancyapps/ui';
import '@fancyapps/ui/dist/carousel/carousel.css';

import { Thumbs } from '@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js';
import '@fancyapps/ui/dist/carousel/carousel.thumbs.css';

const defaults = {
  Dots: false,
  Thumbs: {
    type: 'modern',
  },
};


function Carousel(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current; 
    const options = {
      ...defaults,
      ...(props.options || {}),
    };

    const instance = new NativeCarousel(container, options, {  });

    return () => {
      instance.destroy();
    };
  });

  return (
    <div className="f-carousel" ref={containerRef}>
      {props.children}
    </div>
  );
}

export default Carousel;
