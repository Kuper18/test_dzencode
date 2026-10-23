import { RouterProvider } from 'react-router/dom';
import router from './routes/router.tsx';
import QueryClientProvider from './providers/query-client-provider.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/index.ts';

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
