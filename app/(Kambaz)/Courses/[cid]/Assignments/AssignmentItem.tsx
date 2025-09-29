import Link from "next/link";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { LuNotebookPen } from "react-icons/lu";

export default function AssignmentItem() {
  return (
    <>
      <div className="list-group-item d-flex align-items-center p-3 wd-assignment-item">
        <BsGripVertical className="me-3 fs-3 wd-grip-icon" />
        <LuNotebookPen className="me-2 fs-4 text-success mb-1" />
        <div className="ms-2 flex-grow-1">
            
          <Link href="/Courses/1234/Assignments/123" className="wd-assignment-title">
            A1
          </Link>
          <div className="wd-assignment-details">
            <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 6 at 12:00am |<br />
            <strong>Due</strong> May 13 at 11:59pm | 100 pts
          </div>
        </div>
        <div className="d-flex align-items-center">
          <GreenCheckmark />
          <IoEllipsisVertical className="fs-4" />
        </div>
      </div>

      <div className="list-group-item d-flex align-items-center p-3 wd-assignment-item">
        <BsGripVertical className="me-3 fs-3 wd-grip-icon" />
        <LuNotebookPen className="me-2 fs-4 text-success mb-1" />
        <div className="ms-2 flex-grow-1">
          <Link href="/Courses/1234/Assignments/124" className="wd-assignment-title">
            A2
          </Link>
          <div className="wd-assignment-details">
            <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 13 at 12:00am |<br />
            <strong>Due</strong> May 20 at 11:59pm | 100 pts
          </div>
        </div>
        <div className="d-flex align-items-center">
          <GreenCheckmark />
          <IoEllipsisVertical className="fs-4" />
        </div>
      </div>

      <div className="list-group-item d-flex align-items-center p-3 wd-assignment-item">
        <BsGripVertical className="me-3 fs-3 wd-grip-icon" />
        <LuNotebookPen className="me-2 fs-4 text-success mb-1" />
        <div className="ms-2 flex-grow-1">
          <Link href="/Courses/1234/Assignments/125" className="wd-assignment-title">
            A3
          </Link>
          <div className="wd-assignment-details">
            <span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 20 at 12:00am |<br />
            <strong>Due</strong> May 27 at 11:59pm | 100 pts
          </div>
        </div>
        <div className="d-flex align-items-center">
          <GreenCheckmark />
          <IoEllipsisVertical className="fs-4" />
        </div>
      </div>
    </>
  );
}