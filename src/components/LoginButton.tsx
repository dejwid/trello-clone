'use client';
import {signIn} from "next-auth/react";

export default function LoginButton() {
  return (
    <button onClick={() => signIn('google')}
            className="bg-gray-300 py-2 px-4 ml-2 rounded-md">
      Login
    </button>
  );
}