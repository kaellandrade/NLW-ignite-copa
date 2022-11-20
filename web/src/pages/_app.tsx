import '../styles/global.css';declare module "*.svg" {
  import React from 'react';
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
	  <>
		  <title>NLW Copa 2022</title>
		<Component {...pageProps} />
	  </>
	  )
}
