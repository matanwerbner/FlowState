import styled from 'styled-components';

export const StyledApp = styled.div`
  background-color: #f0f0f0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  overflow: hidden;
  border-radius: 5px;
  width: 600px;
  height: 400px;
`;

export const GameContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RouterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0px;
`;

export const GameHeader = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
`;
