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
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // Default enrollments to empty array if not present
  const enrollmentsSelector = useSelector((state: any) => state.enrollmentsReducer);
  const enrollments = enrollmentsSelector && Array.isArray(enrollmentsSelector.enrollments) ? enrollmentsSelector.enrollments : [];
  const [showAllCourses, setShowAllCourses] = useState(true);
    // Debug: log initial state
    console.log('Dashboard loaded', { showAllCourses });
  const dispatch = useDispatch();
  const router = useRouter();

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

  const onUpdateCourse = async (course: any) => {
    await coursesClient.updateCourse(course);
    dispatch(setCourses(courses.map((c: any) => {
        if (c._id === course._id) { return course; }
        else { return c; }
    })));
  };

  const onDeleteCourse = async (courseId: string) => {
    await coursesClient.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course: any) => course._id !== courseId)));
  };

  const onAddNewCourse = async (course: any) => {
    const newCourse = await coursesClient.createCourse(course);
    dispatch(setCourses([ ...courses, newCourse ]));
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
      return enrollments.some(
        (enrollment: any) =>
          enrollment.user === currentUser?._id && enrollment.course === courseId
      );
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
        await enrollmentsClient.unenrollFromCourse(currentUser._id, courseId);
        dispatch(setEnrollments(enrollments.filter((e: any) => 
          !(e.user === currentUser._id && e.course === courseId)
        )));
      } catch (error) {
        console.error(error);
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
            <Button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              Add
            </Button>
          </h5>
          <br />
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
                            router.push(`/Courses/${course._id}/edit`);
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
                    ) : isEnrolled(course._id) ? (
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
                      
                    )}
                    <button onClick={onUpdateCourse} className="btn btn-secondary float-end" id="wd-update-course-click" >
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
