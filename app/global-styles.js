import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
  font-family: Georgia, Times, 'Times New Roman', serif;
  }

  body.fontLoaded {
	font-family: 'rawlinemedium', sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
	font-family: 'rawlinemedium', sans-serif;
    line-height: 1.5em;
  }
`;
