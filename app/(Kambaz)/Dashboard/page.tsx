import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="React JS" />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">Full Stack software developer</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/4550" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="Web Development" />
            <div>
              <h5>CS4550 Web Development</h5>
              <p className="wd-dashboard-course-title">HTML, CSS, JS, React, Node</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/5610" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="Web Dev Tools" />
            <div>
              <h5>CS5610 Web Dev Tools</h5>
              <p className="wd-dashboard-course-title">Frameworks and tooling</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/5001" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="Intro to Programming" />
            <div>
              <h5>CS5001 Intro to Programming</h5>
              <p className="wd-dashboard-course-title">Programming fundamentals</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/5800" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="Algorithms" />
            <div>
              <h5>CS5800 Algorithms</h5>
              <p className="wd-dashboard-course-title">Design and analysis</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/5200" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="Databases" />
            <div>
              <h5>CS5200 Databases</h5>
              <p className="wd-dashboard-course-title">SQL and NoSQL systems</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/7480" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="Deep Learning" />
            <div>
              <h5>CS7480 Deep Learning</h5>
              <p className="wd-dashboard-course-title">Neural networks and ML</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/3500" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="Object-Oriented Design" />
            <div>
              <h5>CS3500 Object-Oriented Design</h5>
              <p className="wd-dashboard-course-title">Design principles and patterns</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
