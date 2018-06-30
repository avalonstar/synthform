import styled from 'styled-components';
import { rgba } from 'polished';

export const WindowDecoration = styled.div`
  text-align: right;
  border-radius: 6px;
`;

export const FF5WindowDecoration = `
  background-image: linear-gradient(-180deg, #3838d0 0%, #2020a0 100%);
  box-shadow: inset 0 0 0 1px #979797, inset 0 0 0 4px #fff,
    inset 0 0 0 6px ${rgba('#000', 0.25)}, 0 6px 6px 0 ${rgba('#000', 0.26)},
    0 10px 20px 0 ${rgba('#000', 0.19)};
`;

export const EarthBoundWindowDecoration = `
    background-color: #000;
    box-shadow: inset 0 0 0 1px #fff, inset 0 0 0 4px #889090,
      inset 0 0 0 7px #101010, inset 0 0 0 6px ${rgba('#000', 0.25)}, 
      0 6px 6px 0 ${rgba('#000', 0.26)}, 0 10px 20px 0 ${rgba('#000', 0.19)};
`;
