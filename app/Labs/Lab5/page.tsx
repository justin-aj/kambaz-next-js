import EnvironmentVariables from "./EnvironmentVariables";
import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameters";
import WorkingWithObjects from "./WorkingWithObjects";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";
import HTTPClient from "./HTTPClient";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function Lab5() {
  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>
      <div className="list-group">
        <a href={`${HTTP_SERVER}/lab5/welcome`} className="list-group-item">
          Welcome
        </a>
      </div>
      <hr />
      <EnvironmentVariables />
      <hr />
      <PathParameters />
      <hr />
      <QueryParameters />
      <hr />
      <WorkingWithObjects />
      <hr />
      <WorkingWithArrays />
      <hr />
      <WorkingWithObjectsAsynchronously />
      <hr />
      <WorkingWithArraysAsynchronously />
      <hr />
      <HTTPClient />
    </div>
  );
}
