"use client";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as usersClient from "../../../../Account/client";
import * as enrollmentsClient from "../../../../Dashboard/client";

export default function PeopleTable() {
    const { cid } = useParams();
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsersAndEnrollments = async () => {
            const [allUsers, enrollments] = await Promise.all([
                usersClient.findAllUsers(),
                enrollmentsClient.findEnrollmentsForCourse(cid as string)
            ]);
            
            // Filter users who are enrolled in this course
            const enrolledUserIds = enrollments.map((e: any) => e.user);
            const courseUsers = allUsers.filter((user: any) => 
                enrolledUserIds.includes(user._id)
            );
            setUsers(courseUsers);
        };
        fetchUsersAndEnrollments();
    }, [cid]);

    return (
  <div id="wd-people-table">
   <Table striped>
    <thead>
     <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
    </thead>
    <tbody>
        {users.map((user) => (
     <tr key={user._id}><td className="wd-full-name text-nowrap">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <span className="wd-first-name">{user.firstName}</span>{" "}
          <span className="wd-last-name">{user.lastName}</span></td>
      <td className="wd-login-id">{user.loginId}</td>
      <td className="wd-section">{user.section}</td>
      <td className="wd-role">{user.role}</td>
      <td className="wd-last-activity">{user.lastActivity}</td>
      <td className="wd-total-activity">{user.totalActivity}</td></tr>
            ))}
    </tbody>
   </Table>
  </div> );
}