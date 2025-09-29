import AssignmentsControls from "./AssignmentsControls";
import AssignmentsHeader from "./AssignmentsHeader";
import AssignmentItem from "./AssignmentItem";
import "./styles.css";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentsControls />
      
      <div className="border rounded-0">
        <AssignmentsHeader />
        
        <div className="list-group list-group-flush">
          <AssignmentItem />
        </div>
      </div>
    </div>
  );
}
