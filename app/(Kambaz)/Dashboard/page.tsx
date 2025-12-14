"use client";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import { setEnrollments } from "./reducer";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import * as coursesClient from "../Courses/client";
import * as enrollmentsClient from "./client";


import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "react-bootstrap";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // Default enrollments to empty array if not present
  const enrollmentsSelector = useSelector((state: any) => state.enrollmentsReducer);
  const enrollments = enrollmentsSelector && Array.isArray(enrollmentsSelector.enrollments) ? enrollmentsSelector.enrollments : [];
  const [showAllCourses, setShowAllCourses] = useState(true);
  const [course, setCourse] = useState<any>({
    _id: "0", 
    name: "New Course", 
    number: "New Number",
    startDate: "2023-09-10", 
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg", 
    description: "New Description"
  });
    // Debug: log initial state
    console.log('Dashboard loaded', { showAllCourses });
  const dispatch = useDispatch();

  const fetchCourses = useCallback(async (all: boolean) => {
    try {
      let courses;
      if (all) {
        courses = await coursesClient.fetchAllCourses();
        console.log('API response from fetchAllCourses:', courses);
      } else {
        // Get all courses and filter for enrolled ones
        const allCourses = await coursesClient.fetchAllCourses();
        console.log('All courses:', allCourses);
        let enrolledIds: string[] = [];
        if (currentUser?._id) {
          enrolledIds = await coursesClient.findCoursesForUser(currentUser._id);
          console.log('Enrolled course IDs:', enrolledIds);
        }
        courses = allCourses.filter((course: any) => enrolledIds.includes(course._id));
        console.log('Filtered enrolled courses:', courses);
      }
      dispatch(setCourses(courses));
      setTimeout(() => {
        console.log('Redux courses state after dispatch:', courses);
      }, 0);
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, currentUser]);

  const fetchEnrollments = useCallback(async () => {
    if (currentUser) {
      try {
        const enrollments = await enrollmentsClient.findEnrollmentsForUser(currentUser._id);
        dispatch(setEnrollments(enrollments));
      } catch (error) {
        console.error(error);
      }
    }
  }, [currentUser, dispatch]);

  const onUpdateCourse = async (courseToUpdate: any) => {
    console.log('onUpdateCourse called with:', courseToUpdate);
    console.log('Course number being sent:', courseToUpdate.number);
    try {
      const updatedCourse = await coursesClient.updateCourse(courseToUpdate);
      console.log('Update response:', updatedCourse);
      console.log('Course number in response:', updatedCourse?.number);
      dispatch(setCourses(courses.map((c: any) => {
          if (c._id === courseToUpdate._id) { return courseToUpdate; }
          else { return c; }
      })));
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    await coursesClient.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course: any) => course._id !== courseId)));
  };

  const onAddNewCourse = async () => {
    const newCourse = await coursesClient.createCourse(course);
    dispatch(setCourses([ ...courses, newCourse ]));
    // Reset form
    setCourse({
      _id: "0", 
      name: "New Course", 
      number: "New Number",
      startDate: "2023-09-10", 
      endDate: "2023-12-15",
      image: "/images/reactjs.jpg", 
      description: "New Description"
    });
  };

  useEffect(() => {
    fetchCourses(showAllCourses);
    fetchEnrollments();
  }, [fetchCourses, fetchEnrollments, showAllCourses]);

  // Courses state now always matches selected view
  const filteredCourses = courses;

  // Check if user is enrolled in a course (matches courses state)
  const isEnrolled = (courseId: string) => {
    if (showAllCourses) {
      // Use enrollments array to check
      const enrolled = enrollments.some(
        (enrollment: any) => {
          // Handle both string IDs and object references
          const enrollmentCourse = enrollment.course?._id || enrollment.course;
          const enrollmentUser = enrollment.user?._id || enrollment.user;
          return enrollmentUser === currentUser?._id && enrollmentCourse === courseId;
        }
      );
      console.log('isEnrolled check:', { courseId, enrolled, enrollments });
      return enrolled;
    } else {
      // Use courses array (enrolled courses only)
      return courses.some((course: any) => course._id === courseId);
    }
  };

  // Handle enrollment
  const handleEnroll = async (courseId: string) => {
    console.log("Enroll clicked", { currentUser, courseId });
    if (currentUser) {
      try {
        await enrollmentsClient.enrollInCourse(currentUser._id, courseId);
        // Re-fetch enrollments for guaranteed UI update
        const updatedEnrollments = await enrollmentsClient.findEnrollmentsForUser(currentUser._id);
        dispatch(setEnrollments(updatedEnrollments));
        // Re-fetch courses to update the view
        fetchCourses(showAllCourses);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No current user");
    }
  };

  // Handle unenrollment
  const handleUnenroll = async (courseId: string) => {
    console.log("Unenroll clicked", { currentUser, courseId });
    if (currentUser) {
      try {
        const deleteResult = await enrollmentsClient.unenrollFromCourse(currentUser._id, courseId);
        console.log("Unenroll API result:", deleteResult);
        // Re-fetch enrollments for guaranteed UI update
        const updatedEnrollments = await enrollmentsClient.findEnrollmentsForUser(currentUser._id);
        console.log("Updated enrollments after unenroll:", updatedEnrollments);
        dispatch(setEnrollments(updatedEnrollments));
        // Re-fetch courses to update the view
        fetchCourses(showAllCourses);
      } catch (error) {
        console.error("Unenroll error:", error);
      }
    } else {
      console.log("No current user");
    }
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {currentUser?.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button 
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              Add
            </button>
            <button 
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={() => onUpdateCourse(course)}
            >
              Update
            </button>
          </h5>
          <br />
          <input 
            value={course.name || ""}
            className="form-control mb-2" 
            placeholder="Course Name"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} 
          />
          <input 
            value={course.number || ""}
            className="form-control mb-2" 
            placeholder="Course Number"
            onChange={(e) => setCourse({ ...course, number: e.target.value })} 
          />
          <textarea 
            value={course.description || ""}
            className="form-control mb-2" 
            placeholder="Course Description"
            onChange={(e) => setCourse({ ...course, description: e.target.value })} 
          />
          <input 
            type="date"
            value={course.startDate || ""}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, startDate: e.target.value })} 
          />
          <input 
            type="date"
            value={course.endDate || ""}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, endDate: e.target.value })} 
          />
          <hr />
        </>
      )}

      <Button
        className="btn btn-primary float-end mb-3"
        onClick={() => {
          console.log('All Courses button clicked', { showAllCourses });
          setShowAllCourses(!showAllCourses);
        }}
      >
        {showAllCourses ? "Enrolled Courses" : "All Courses"}
      </Button>

      <h2 id="wd-dashboard-published">
          Published Courses ({filteredCourses.length})
          {/* Debug: log filtered courses */}
          {console.log('Filtered courses', { showAllCourses, filteredCourses, courses, enrollments })}
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {filteredCourses.map((course: any) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src="/images/reactjs.jpg"
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    <Button className="btn btn-primary">Go</Button>

                    {currentUser?.role === "FACULTY" ? (
                      <>
                        <Button
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning float-end"
                          id="wd-edit-course-click"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={(event) => {
                            event.preventDefault();
                            onDeleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end me-2"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </Button>
                      </>
                    ) : showAllCourses ? (
                      isEnrolled(course._id) ? (
                        <Button
                          onClick={(event) => {
                            event.preventDefault();
                            handleUnenroll(course._id);
                          }}
                          className="btn btn-danger float-end"
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          onClick={(event) => {
                            event.preventDefault();
                            handleEnroll(course._id);
                          }}
                          className="btn btn-success float-end"
                        >
                          Enroll
                        </Button>
                      )
                    ) : null}
                    <button 
                      onClick={(event) => {
                        event.preventDefault();
                        onUpdateCourse({...course, name: course.name + " (Updated)"});
                      }} 
                      className="btn btn-secondary float-end" 
                      id="wd-update-course-click"
                    >
                      Update
                    </button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
