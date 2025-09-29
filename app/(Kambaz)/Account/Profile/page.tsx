import Link from "next/link";
import { Button, Col, Form, FormCheck, FormControl, FormLabel, FormSelect, InputGroup, Row } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-4">
      <h1 className="mb-4">Profile</h1>
      <Form style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <FormControl
            id="wd-username"
            type="text"
            placeholder="username"
            defaultValue="alice"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <FormControl
            id="wd-password"
            type="password"
            placeholder="password"
            defaultValue="123"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <FormControl
            id="wd-firstname"
            type="text"
            placeholder="First Name"
            defaultValue="Alice"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <FormControl
            id="wd-lastname"
            type="text"
            placeholder="Last Name"
            defaultValue="Wonderland"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <FormControl
            id="wd-dob"
            type="date"
            defaultValue="2000-01-01"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <FormControl
            id="wd-email"
            type="email"
            placeholder="Email"
            defaultValue="alice@wonderland.com"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <FormSelect id="wd-role" defaultValue="FACULTY" className="form-select">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </FormSelect>
        </div>
        <Link
          id="wd-signout-btn"
          href="/Account/Signin"
          className="btn btn-danger w-100 text-decoration-none d-block text-center"
        >
          Sign out
        </Link>
      </Form>
    </div>
  );
}
