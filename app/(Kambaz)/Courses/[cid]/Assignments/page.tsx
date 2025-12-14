"use client";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useCallback } from "react";
import AssignmentsControls from "./AssignmentsControls";
import AssignmentsHeader from "./AssignmentsHeader";
import AssignmentItem from "./AssignmentItem";
import { setAssignments } from "./reducer";
import * as client from "./client";
import "./styles.css";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const courseAssignments = assignments.filter((assignment: any) => assignment.course === cid);

  const fetchAssignments = useCallback(async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  }, [cid, dispatch]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return (
    <div id="wd-assignments">
      <AssignmentsControls />
      
      <div className="border rounded-0">
        <AssignmentsHeader />
        
        <div className="list-group list-group-flush">
          {courseAssignments.map((assignment: any) => (
            <AssignmentItem key={assignment._id} assignment={assignment} />
          ))}
        </div>
      </div>
    </div>
  );
}
