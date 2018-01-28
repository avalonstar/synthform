import { injectGlobal } from 'styled-components';
import { normalize } from 'polished';

export const foundation = {
  forza: "'Forza SSm A', 'Forza SSm B'",
  gotham: "'Gotham SSm A', 'Gotham SSm B'",
  whitney: "'Whitney SSm A', 'Whitney SSm B'",
  miedinger: 'Miedinger'
};

const fontURL = 'https://synthform.s3.amazonaws.com/fonts';

export default () => injectGlobal`
  ${normalize()}

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: $sans-serif;
  }

  @font-face {
    font-family: 'Miedinger';
    src: url('${fontURL}/miedinger_thin-webfont.woff2') format('woff2'),
      url('${fontURL}/miedinger_thin-webfont.woff') format('woff');
    font-weight: 100;
    font-style: normal;
  }

  @font-face {
    font-family: 'Miedinger';
    src: url('${fontURL}/miedinger_light-webfont.woff2') format('woff2'),
      url('${fontURL}/miedinger_light-webfont.woff') format('woff');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Miedinger';
    src: url('${fontURL}/miedinger_regular-webfont.woff2') format('woff2'),
      url('${fontURL}/miedinger_regular-webfont.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Miedinger';
    src: url('${fontURL}/miedinger_medium-webfont.woff2') format('woff2'),
      url('${fontURL}/miedinger_medium-webfont.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Miedinger';
    src: url('${fontURL}/miedinger_bold-webfont.woff2') format('woff2'),
      url('${fontURL}/miedinger_bold-webfont.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }
`;
