import styled from 'styled-components';
import LoadingIcon from '../../assets/loading.gif';

// container for loading spinner
const StyledLoading = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const Loading = () => (
  <StyledLoading data-testid="loader">
    <img src={LoadingIcon} alt="loading" />
  </StyledLoading>
);
