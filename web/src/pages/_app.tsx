import '../styles/global.css';declare module "*.svg" {
  import React from 'react';
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
