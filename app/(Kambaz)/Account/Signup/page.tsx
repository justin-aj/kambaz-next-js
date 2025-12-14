"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({ username: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();
  
  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    router.push("/Account/Profile");
  };
  return (
    <div id="wd-signup-screen" className="p-4">
      <h1 className="mb-4">Sign up</h1>
      <FormControl 
        id="wd-username"
        value={user.username} 
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="form-control mb-3" 
        placeholder="username" 
      />
      <FormControl 
        id="wd-password"
        value={user.password} 
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        className="form-control mb-3" 
        placeholder="password" 
        type="password"
      />
      <button 
        id="wd-signup-btn"
        onClick={signup} 
        className="btn btn-primary w-100 mb-2"
      >
        Sign up
      </button>
      <div className="text-center">
        <Link id="wd-signin-link" href="/Account/Signin" className="text-decoration-none">
          Sign in
        </Link>
      </div>
    </div>
  );
}
