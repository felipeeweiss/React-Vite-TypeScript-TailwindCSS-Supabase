import { Outlet, useNavigate } from 'react-router-dom';
import BackgroundImg from '../../assets/background.jpg';
import ReactImg from '../../assets/react.svg';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useEffect } from 'react';

export const AuthLayout = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) return null;

  return (
    <div
      className="relative flex items-center justify-center w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BackgroundImg})` }}
    >
      <div
        className="
          flex flex-col border border-gray-300 rounded-xl p-8 gap-4 bg-white 
          /* Mobile: Largura flexível, sem posição absoluta */
          w-[95%] max-w-[400px] relative
          md:absolute md:right-[10%] md:top-1/2 md:-translate-y-1/2 md:w-100
        "
      >
        <div className="flex gap-2 items-center">
          <img src={ReactImg} alt="React Logo" />
          <h3 className="font-medium text-xl text-gray-900">Project name</h3>
        </div>

        <Outlet />
      </div>
    </div>
  );
};
