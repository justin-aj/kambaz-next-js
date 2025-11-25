"use client";

import PeopleTable from "./Table";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { findUsersForCourse } from "../../client";


export default function PeoplePage() {
  const [users, setUsers] = useState([]);
  const { cid } = useParams();
  const fetchUsers = async () => {
    try {
      const data = await findUsersForCourse(cid as string);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
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
