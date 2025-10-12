"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { assignments } from "../../../../Database";
import { Col, Form, FormCheck, FormControl, FormLabel, FormSelect, Row } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = assignments.find((a) => a._id === aid);

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <div className="mb-3">
          <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
          <FormControl 
            id="wd-name" 
            type="text"
            defaultValue={assignment.title}
          />
        </div>

        <div className="mb-3">
          <FormControl
            id="wd-description"
            as="textarea"
            rows={6}
            defaultValue={assignment.description}
          />
        </div>

        <Row className="mb-3">
          <Col md={3}>
            <FormLabel htmlFor="wd-points">Points</FormLabel>
          </Col>
          <Col md={9}>
            <FormControl
              id="wd-points"
              type="number"
              defaultValue={assignment.points}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <FormLabel htmlFor="wd-group">Assignment Group</FormLabel>
          </Col>
          <Col md={9}>
            <FormSelect id="wd-group" defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <FormLabel htmlFor="wd-display-grade-as">Display Grade as</FormLabel>
          </Col>
          <Col md={9}>
            <FormSelect id="wd-display-grade-as" defaultValue="Percentage">
              <option value="Percentage">Percentage</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <FormLabel htmlFor="wd-submission-type">Submission Type</FormLabel>
          </Col>
          <Col md={9}>
          <div className="border rounded p-3">
            <FormSelect id="wd-submission-type" defaultValue="Online">
              <option value="Online">Online</option>
            </FormSelect>

            <div className="mt-3 p-3 border rounded">
              <FormLabel className="fw-bold">Online Entry Options</FormLabel>
              <FormCheck
                type="checkbox"
                id="wd-text-entry"
                label="Text Entry"
                className="mb-2"
              />
              <FormCheck
                type="checkbox"
                id="wd-website-url"
                label="Website URL"
                className="mb-2"
                defaultChecked
              />
              <FormCheck
                type="checkbox"
                id="wd-media-recordings"
                label="Media Recordings"
                className="mb-2"
              />
              <FormCheck
                type="checkbox"
                id="wd-student-annotation"
                label="Student Annotation"
                className="mb-2"
              />
              <FormCheck
                type="checkbox"
                id="wd-file-upload"
                label="File Uploads"
              />
            </div>
            </div>
          </Col>
          
        </Row>

        <Row className="mb-3">
          <Col md={3}>
            <FormLabel>Assign</FormLabel>
          </Col>
          <Col md={9}>
            <div className="border rounded p-3">
              <div className="mb-3">
                <FormLabel htmlFor="wd-assign-to">Assign to</FormLabel>
                <FormControl
                  id="wd-assign-to"
                  type="text"
                  defaultValue="Everyone"
                />
              </div>

              <div className="mb-3">
                <FormLabel htmlFor="wd-due-date">Due</FormLabel>
                <FormControl
                  id="wd-due-date"
                  type="datetime-local"
                  defaultValue={assignment.dueDate}
                />
              </div>

              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <FormLabel htmlFor="wd-available-from">Available from</FormLabel>
                    <FormControl
                      id="wd-available-from"
                      type="datetime-local"
                      defaultValue={assignment.availableFrom}
                    />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <FormLabel htmlFor="wd-available-until">Until</FormLabel>
                    <FormControl
                      id="wd-available-until"
                      type="datetime-local"
                      defaultValue={assignment.availableUntil}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <hr />

        <div className="d-flex justify-content-end">
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-secondary me-2" id="wd-cancel">
            Cancel
          </Link>
          <Link href={`/Courses/${cid}/Assignments`} className="btn btn-danger" id="wd-save">
            Save
          </Link>
        </div>
      </Form>
    </div>
  );
}
