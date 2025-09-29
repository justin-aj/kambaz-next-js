import Link from "next/link";
import { Button, Col, Form, FormCheck, FormControl, FormLabel, FormSelect, InputGroup, Row } from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="p-4">
      <h1 className="mb-4">Sign in</h1>
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
        <Link
          id="wd-signin-btn"
          href="/Account/Profile"
          className="btn btn-primary w-100 mb-2 text-decoration-none d-block text-center"
        >
          Sign in
        </Link>
        <div className="text-center">
          <Link id="wd-signup-link" href="/Account/Signup" className="text-decoration-none">
            Sign up
          </Link>
        </div>
      </Form>
    </div>
  );
}