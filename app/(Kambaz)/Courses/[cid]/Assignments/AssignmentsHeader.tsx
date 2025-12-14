import { Button } from "react-bootstrap";
import { BsGripVertical, BsChevronDown } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";

export default function AssignmentsHeader() {
  return (
    <div className="p-3 bg-secondary border-bottom d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <BsGripVertical className="me-2 fs-3 wd-grip-icon" />
        <BsChevronDown className="ms-2" />
        <strong>ASSIGNMENTS</strong>
      </div>
      <div className="d-flex align-items-center">
        <span className="ms-2 text-muted">40% of Total</span>
        <Button variant="outline-dark" size="sm" className="ms-4 me-2">
          <FaPlus />
        </Button>
        <IoEllipsisVertical className="fs-4" />
      </div>
    </div>
  );
}