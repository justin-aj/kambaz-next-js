import Link from "next/link";
import { Button, Col, Form, FormCheck, FormControl, FormLabel, FormSelect, InputGroup, Row } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="p-4">
      <h1 className="mb-4">Sign up</h1>
      <Form style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <FormControl
            id="wd-username"
            type="text"
            defaultValue={"alice"}
            placeholder="username"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <FormControl
            id="wd-password"
            type="password"
            defaultValue={"123"}
            placeholder="password"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <FormControl
            id="wd-password-verify"
            type="password"
            defaultValue={"123"}
            placeholder="verify password"
            className="form-control"
          />
        </div>
        <Link
          id="wd-signup-btn"
          href="/Account/Profile"
          className="btn btn-primary w-100 mb-2 text-decoration-none d-block text-center"
        >
          Sign up
        </Link>
        <div className="text-center">
          <Link id="wd-signin-link" href="/Account/Signin" className="text-decoration-none">
            Sign in
          </Link>
        </div>
      </Form>
    </div>
  );
}
