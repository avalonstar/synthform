import styled from 'styled-components';
import { rgba } from 'polished';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  overflow: hidden;

  background: linear-gradient(#2c333a, #23292f);
  border-radius: 4px;
  box-shadow: 0 1px 3px ${rgba('#090a0c', 0.12)},
    0 1px 2px ${rgba('#090a0c', 0.24)};
  color: #f3f5f6;
  font-size: 13px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 9px 10px 9px 8px;
  margin-right: 10px;

  background: linear-gradient(#23292f, #1a1f23);
  color: #738596;
  font-family: ${props => props.theme.forza};
  font-weight: 700;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export default {
  Wrapper,
  Title,
  Content
};
