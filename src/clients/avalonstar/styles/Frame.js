import styled from 'styled-components';
import { rgba } from 'polished';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 36px 1fr 36px;

  position: absolute;
  overflow: hidden;
  width: 1920px;
  height: 1080px;

  background: linear-gradient(
    105deg,
    ${rgba('#000', 0)} 85%,
    ${rgba('#000', 0.4)}
  );
`;

const Container = styled.div``;

export default {
  Wrapper,
  Container
};
