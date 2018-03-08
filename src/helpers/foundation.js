import { injectGlobal } from 'styled-components';
import { fontFace, normalize } from 'polished';

export const foundation = {
  forza: "'Forza SSm A', 'Forza SSm B'",
  chronotype: 'Chronotype',
  gotham: "'Gotham SSm A', 'Gotham SSm B'",
  whitney: "'Whitney SSm A', 'Whitney SSm B'",
  miedinger: 'Miedinger'
};

const fontURL = 'https://synthform.s3.amazonaws.com/fonts';
const miedingerDefaults = {
  fontFamily: 'Miedinger',
  fileFormats: ['woff2', 'woff'],
  fontStyle: 'normal'
};

export default () => injectGlobal`
  ${normalize()}

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  strong {
    font-weight: 700;
  }

  ${fontFace({
    ...miedingerDefaults,
    fontFilePath: `${fontURL}/miedinger_thin-webfont`,
    fontWeight: 100
  })}

  ${fontFace({
    ...miedingerDefaults,
    fontFilePath: `${fontURL}/miedinger_light-webfont`,
    fontWeight: 300
  })}

  ${fontFace({
    ...miedingerDefaults,
    fontFilePath: `${fontURL}/miedinger_regular-webfont`,
    fontWeight: 400
  })}

  ${fontFace({
    ...miedingerDefaults,
    fontFilePath: `${fontURL}/miedinger_medium-webfont`,
    fontWeight: 500
  })}

  ${fontFace({
    ...miedingerDefaults,
    fontFilePath: `${fontURL}/miedinger_bold-webfont`,
    fontWeight: 700
  })}

  ${fontFace({
    fontFamily: 'Chronotype',
    fileFormats: ['woff2', 'woff'],
    fontStyle: 'normal',
    fontFilePath: `${fontURL}/chronotype-webfont`
  })}
`;
