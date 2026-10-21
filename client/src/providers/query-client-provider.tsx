import { QueryClientProvider as ClientProvider } from '@tanstack/react-query';
import queryClient from '../lib/react-query';

type Props = {
  children: React.ReactNode;
};

const QueryClientProvider: React.FC<Props> = ({ children }) => {
  return <ClientProvider client={queryClient}>{children}</ClientProvider>;
};

export default QueryClientProvider;
