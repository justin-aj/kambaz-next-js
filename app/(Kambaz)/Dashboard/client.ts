import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

// Get all enrollments for current user
export const findEnrollmentsForUser = async (userId: string) => {
  const response = await axiosWithCredentials.get(`${ENROLLMENTS_API}/user/${userId}`);
  return response.data;
};

// Enroll in a course
export const enrollInCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${ENROLLMENTS_API}/${userId}/${courseId}`
  );
  return response.data;
};

// Unenroll from a course
export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${ENROLLMENTS_API}/${userId}/${courseId}`
  );
  return response.data;
};

// Get all enrollments for a course
export const findEnrollmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${ENROLLMENTS_API}/course/${courseId}`);
  return response.data;
};

// Get all enrollments (for admin)
export const findAllEnrollments = async () => {
  const response = await axios.get(ENROLLMENTS_API);
  return response.data;
};
