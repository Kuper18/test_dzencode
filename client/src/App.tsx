import { RouterProvider } from 'react-router/dom';
import router from './routes/router.tsx';
import QueryClientProvider from './providers/query-client-provider.tsx';

function App() {
  return (
    <QueryClientProvider>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
