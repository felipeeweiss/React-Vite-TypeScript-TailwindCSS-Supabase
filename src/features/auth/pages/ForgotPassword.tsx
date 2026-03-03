import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../shared/components/Button";
import { useAuth } from "../hooks/useAuth";
import BackgroundImg from "../../../assets/background.jpg";
import ReactImg from "../../../assets/react.svg";

export const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    const email = emailRef.current?.value;
    
    if (!email) {
      alert("All inputs must be completed");
      return;
    }

    try {
      await resetPassword(email);
      navigate("/login");
    } catch {
      console.log("Error to login");
    }
  }

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BackgroundImg})` }}
    >
      <div className="flex flex-col border border-gray-300 absolute w-100 rounded-xl p-8 gap-4 bg-white right-[10%] top-1/2 -translate-y-1/2">
        <div className="flex gap-2 items-center">
          <img src={ReactImg} />
          <h3 className="font-medium text-xl text-gray-900">App name</h3>
        </div>

        <div>
          <h1 className="font-bold text-3xl pb-1">Reset Password</h1>
          <h2 className="font-extralight text-lg text-gray-500">
            Create a new account to access your workspace
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

          <Button buttonType="submit" text="Reset" />
        </form>

        <div className="flex justify-center gap-1">
          <span className="text-sm text-gray-500">Already have an account?</span>
          <Link
            to="/login"
            className="font-semibold text-sm text-blue-800 hover:opacity-75 duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
