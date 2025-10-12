"use client";
import { useParams } from "next/navigation";
import { assignments } from "../../../Database";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentsHeader from "./AssignmentsHeader";
import AssignmentItem from "./AssignmentItem";
import "./styles.css";

export default function Assignments() {
  const { cid } = useParams();
  const courseAssignments = assignments.filter((assignment) => assignment.course === cid);

  return (
    <div id="wd-assignments">
      <AssignmentsControls />
      
      <div className="border rounded-0">
        <AssignmentsHeader />
        
        <div className="list-group list-group-flush">
          {courseAssignments.map((assignment) => (
            <AssignmentItem key={assignment._id} assignment={assignment} />
          ))}
        </div>
      </div>
    </div>
  );
}
