import { Header } from '../components/Header';

export const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <Header />
    <main>{children}</main>
  </div>
);