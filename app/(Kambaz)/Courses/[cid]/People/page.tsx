"use client";
import PeopleTable from "./Table";
import { useEffect, useState } from "react";
import * as peopleClient from "./client";
import { useParams } from "next/navigation";


export default function PeoplePage() {
  const [users, setUsers] = useState([]);
  const { cid } = useParams();
  const fetchUsers = async () => {
    // Import from Courses/client.ts
    const { findUsersForCourse } = await import("../../client");
    const data = await findUsersForCourse(cid as string);
    setUsers(data);
  };
  useEffect(() => {
    if (cid) fetchUsers();
  }, [cid]);
  return (
    <div>
      <h1>People</h1>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
