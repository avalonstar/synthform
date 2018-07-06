import styled from 'styled-components';
import { rgba } from 'polished';

import smrpgBkg from './smrpg.png';

export const WindowDecoration = styled.div`
  border-radius: 6px;
`;

export const FF5WindowDecoration = `
  background-image: linear-gradient(-180deg, #3838d0 0%, #2020a0 100%);
  box-shadow: inset 0 0 0 1px #979797, inset 0 0 0 4px #fff,
    inset 0 0 0 6px ${rgba('#000', 0.25)}, 0 6px 6px 0 ${rgba('#000', 0.26)},
    0 10px 20px 0 ${rgba('#000', 0.19)};

  font-style: italic;
  text-align: right;
`;

export const EBWindowDecoration = `
  background-color: #101010;
  box-shadow: inset 0 0 0 1px #889090,
    inset 0 0 0 3px #fff, inset 0 0 0 4px #889090, 
    inset 0 0 0 6px ${rgba('#000', 0.25)}, 0 6px 6px 0 ${rgba('#000', 0.26)}, 
    0 10px 20px 0 ${rgba('#000', 0.19)};

  font-style: normal;
  text-align: left;
`;

export const SMRPGWindowDecoration = `
  background-color: #000;
  background-image: url(${smrpgBkg});
  box-shadow: inset 0 0 0 1px #980000,
    inset 0 0 0 3px #e80000, inset 0 2px 0 4px #980000,
    inset 0 0 0 6px ${rgba('#000', 0.25)}, 0 6px 6px 0 ${rgba('#000', 0.26)}, 
    0 10px 20px 0 ${rgba('#000', 0.19)};
  color: #d0d0f8;
  text-shadow: 0 1px 0 #203078;
`;
