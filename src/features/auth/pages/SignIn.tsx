import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { useToast } from '@felipeeweiss/react-toast-message';
import { z } from 'zod';
import { Button } from '../../../shared/components/Button';
import { useAuth } from '../hooks/useAuth';

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const SignIn = () => {
  const { signIn, signInWithProvider } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    const result = signInSchema.safeParse(data);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;
      addToast(errorMessage);
      return;
    }

    try {
      await signIn(result.data.email, result.data.password);
      navigate('/');
    } catch {
      addToast('Error to sign in. Please, check your credentials.', 'error');
    }
  }

  async function handleSocialSignIn(provider: 'google' | 'github') {
    try {
      await signInWithProvider(provider);
    } catch (error) {
      addToast(`Error connecting to ${provider}`, 'error');
    }
  }

  return (
    <>
      <div>
        <h1 className="font-bold text-3xl pb-1">Welcome</h1>
        <h2 className="font-extralight text-lg text-gray-500">
          Enter your credentials to access your workspace
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <label className="font-semibold text-sm text-gray-900">Email</label>
          <input
            ref={emailRef}
            className="border border-gray-300 rounded-lg p-3 text-sm text-gray-700"
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="flex justify-between">
            <label className="font-semibold text-sm text-gray-900">
              Password
            </label>

            <Link
              to="/forgot-password"
              className="font-semibold text-xs text-blue-800"
            >
              Forgot Password?
            </Link>
          </div>

          <input
            ref={passwordRef}
            type="password"
            className="border border-gray-300 rounded-lg p-3 text-sm"
          />
        </div>

        <Button type="submit" text="Sign in" />
      </form>

      <div className="flex items-center w-full my-4">
        <div className="grow border-t border-gray-300" />
        <span className="mx-4 text-sm text-gray-400 uppercase font-medium">
          <span className="md:hidden">Or continue with</span>
          <span className="hidden md:inline">Or</span>
        </span>
        <div className="grow border-t border-gray-300" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
        <Button
          variant="secondary"
          onClick={() => handleSocialSignIn('google')}
          className="flex items-center justify-center gap-2"
        >
          <FaGoogle className="w-5 h-5" />
          <div>
            <span className="hidden md:inline">Continue with </span>Google
          </div>
        </Button>

        <Button
          variant="secondary"
          onClick={() => handleSocialSignIn('github')}
          className="flex items-center justify-center gap-2"
        >
          <FaGithub className="w-5 h-5" />
          <div>
            <span className="hidden md:inline">Continue with </span>GitHub
          </div>
        </Button>
      </div>

      <div className="flex justify-center gap-1">
        <span className="text-sm text-gray-500">Don't have an account?</span>

        <Link to="/signup" className="font-semibold text-sm text-blue-800">
          Sign Up
        </Link>
      </div>
    </>
  );
};
