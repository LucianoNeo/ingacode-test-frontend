import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Provider } from './contexts/MyContext';

import Router from "./Router";

function App() {

  return (

    <AuthProvider>
      <Provider>
        <MemoryRouter>
          <Router />
        </MemoryRouter>
      </Provider>
    </AuthProvider>

  )
}

export default App
