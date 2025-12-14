"use client";
import * as client from "../client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button, Form } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({ username: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();
  
  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    router.push("/Account/Profile");
  };

  return (
    <div id="wd-signin-screen" className="p-4">
      <h1 className="mb-4">Sign in</h1>
      <Form style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <FormControl
            id="wd-username"
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            placeholder="username"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <FormControl
            id="wd-password"
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            placeholder="password"
            className="form-control"
          />
        </div>
        <Button onClick={signin} id="wd-signin-btn" className="w-100" >
          Sign in
        </Button>
        <div className="text-center">
          <Link id="wd-signup-link" href="/Account/Signup" className="text-decoration-none">
            Sign up
          </Link>
        </div>
      </Form>
    </div>
  );
}