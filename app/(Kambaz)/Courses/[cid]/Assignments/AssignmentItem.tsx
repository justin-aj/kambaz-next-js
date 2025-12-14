"use client";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments } from "./reducer";
import * as client from "./client";
import Link from "next/link";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";
import { LuNotebookPen } from "react-icons/lu";

export default function AssignmentItem({ assignment }: { 
  assignment: {
    _id: string;
    title: string;
    description: string;
    points: number;
    dueDate: string;
    availableFrom: string;
    availableUntil: string;
  }
}) {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to remove the assignment "${assignment.title}"?`)) {
      await client.deleteAssignment(assignment._id);
      const updatedAssignments = assignments.filter((a: any) => a._id !== assignment._id);
      dispatch(setAssignments(updatedAssignments));
    }
  };

  return (
    <div className="list-group-item d-flex align-items-center p-3 wd-assignment-item">
      <BsGripVertical className="me-3 fs-3 wd-grip-icon" />
      <LuNotebookPen className="me-2 fs-4 text-success mb-1" />
      <div className="ms-2 flex-grow-1">
        <Link href={`/Courses/${cid}/Assignments/${assignment._id}`} className="wd-assignment-title text-decoration-none text-dark fw-bold">
          {assignment.title}
        </Link>
        <div className="wd-assignment-details">
          <span className="text-danger">Multiple Modules</span> | 
          <strong> Not available until</strong> {formatDate(assignment.availableFrom)} |<br />
          <strong>Due</strong> {formatDate(assignment.dueDate)} | {assignment.points} pts
        </div>
      </div>
      <div className="d-flex align-items-center">
        <FaTrash 
          className="text-danger me-2 mb-1" 
          onClick={handleDelete}
          style={{ cursor: 'pointer' }}
          title="Delete assignment"
        />
        <GreenCheckmark />
        <IoEllipsisVertical className="fs-4" />
      </div>
    </div>
  );
}