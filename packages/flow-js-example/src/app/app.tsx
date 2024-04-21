import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  StyledApp,
  RouterContainer,
  GameHeader,
  GameContainer,
} from './app.styled';
import { Router } from './router';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledApp>
        <GameContainer>
          <GameHeader>Trivia game</GameHeader>
          <RouterContainer>
            <Router />
          </RouterContainer>
        </GameContainer>
      </StyledApp>
    </QueryClientProvider>
  );
}

export default App;
