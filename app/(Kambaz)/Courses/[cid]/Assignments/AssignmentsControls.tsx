import { Button, InputGroup, Form } from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";
import { FaPlus, FaSearch } from "react-icons/fa";

export default function AssignmentsControls() {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div className="d-flex align-items-center flex-grow-1 me-3">
        <InputGroup className="wd-search-container">
          <InputGroupText>
            <FaSearch />
          </InputGroupText>
          <Form.Control
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
        </InputGroup>
      </div>
      <div className="d-flex">
        <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
          <FaPlus className="me-1" /> Group
        </Button>
        <Button variant="danger" id="wd-add-assignment">
          <FaPlus className="me-1" /> Assignment
        </Button>
      </div>
    </div>
  );
}