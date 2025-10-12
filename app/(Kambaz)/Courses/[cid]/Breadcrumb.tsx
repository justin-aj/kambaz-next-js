"use client";
import React from "react";
import { usePathname } from "next/navigation";


export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
 const pathname = usePathname();
 const lastSegment = pathname.split("/").pop();
 
 const displayName = lastSegment === "Table" ? "People" : lastSegment;
 
 return (
   <span>
     {course?.name} &gt; {displayName}
   </span>
 );
}
