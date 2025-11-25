"use client";

import PeopleTable from "./Table";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { findUserById } from "../../../Account/client";

export default function PeoplePage() {
  const [users, setUsers] = useState<any[]>([]);
  const { cid } = useParams();
  const fetchUsers = async () => {
    // Get array of user IDs
    const { findUsersForCourse } = await import("../../client");
    const ids = await findUsersForCourse(cid as string);

    // Fetch full user objects for each ID
    const userPromises = ids.map((id: string) => findUserById(id));
    const userObjects = await Promise.all(userPromises);
    setUsers(userObjects);
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
