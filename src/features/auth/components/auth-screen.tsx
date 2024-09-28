'use client';

import { useState } from "react";
import { SignInFlow } from "../types";
import {SignUpCard} from "./sign-up-card";
import {SignInCard} from "./sign-in-card";

export function AuthScreen() {
    const [state, setState] = useState<SignInFlow>("signIn")
  return (
    <div className="bg-[#5C3B58] h-[100vh] flex justify-center items-center">
      <div className="md:h-auto md:w-[420px]">
        {state === "signIn" ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  );
}
