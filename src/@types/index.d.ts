import { DOMAttributes } from 'react';
import React from 'react';

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
}
declare namespace JSX {
  interface ExtendedButton
    extends React.DetailedHTMLProps<DOMAttributes<HTMLDivElement>, HTMLDivElement> {
    isOpen?: boolean;
  }

  interface IntrinsicElements {
    button: ExtendedButton;
  }
}
