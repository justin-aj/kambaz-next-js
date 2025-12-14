"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function CourseNavigation() {
  const { cid } = useParams();
  const pathname = usePathname();
  const links = [
    { label: "Home", path: "Home" },
    { label: "Modules", path: "Modules" },
    { label: "Piazza", path: "Home" },
    { label: "Zoom", path: "Home" },
    { label: "Assignments", path: "Assignments" },
    { label: "Quizzes", path: "Home" },
    { label: "Grades", path: "Home" },
    { label: "People", path: "People" }
  ];
  
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link 
          key={link.label}
          href={`/Courses/${cid}/${link.path}`} 
          id={`wd-course-${link.label.toLowerCase()}-link`}
          className={`list-group-item border-0 ${
            pathname.includes(link.label) ? "active" : "text-danger"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
