export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
    <h3 id="wd-assignment-name-header">Assignment Name</h3>
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of your Web Application
        running on Netlify. The landing page should include the following: Your full name and section Links to 
        each of the lab assignments Link to Kanbas application Links to all relevant source code repositories.
        The Kanbaz application should include a link to navigate back to the landing page.
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label><br /><br />
          </td>
          <td>
            <input id="wd-points" type="number" value={100} /><br /><br />
          </td>
          
          
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
                <select id="wd-group">
                    <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                </select><br /><br />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade As</label>
          </td>
          <td>
                <select id="wd-display-grade-as">
                    <option value="Percentage">Percentage</option>
                </select><br /><br />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
                <select id="wd-submission-type">
                    <option value="Online">Online</option>
                </select><br /><br />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
          </td>
          <td>
                <label>Online Entry Options</label><br/>
                    <input type="checkbox" id="wd-text-entry"/>
                    <label htmlFor="wd-text-entry">Text Entry</label><br/>
                    <input type="checkbox"  id="wd-website-url"/>
                    <label htmlFor="wd-website-url">Website URL</label><br/>
                    <input type="checkbox" id="wd-media-recordings"/>
                    <label htmlFor="wd-media-recordings">Media Recordings</label><br/>
                    <input type="checkbox" id="wd-student-annotation"/>
                    <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
                    <input type="checkbox" id="wd-file-upload"/>
                    <label htmlFor="wd-file-upload">File Uploads</label><br/><br />
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign</label>
          </td>
          <td>
            <label htmlFor="wd-assign-to">Assign to</label><br />
            <input id="wd-assign-to" defaultValue="Everyone" /><br /><br />

            <label htmlFor="wd-due-date">Due Date</label><br />
            <input id="wd-due-date" type="date" defaultValue="2024-05-13"/><br /><br />
            <table>
            <tr>
              <td>
                <label htmlFor="wd-available-from">Available From</label><br />
                <input id="wd-available-from" type="date" defaultValue="2024-05-06"/>
              </td>
              <td>
                <label htmlFor="wd-available-until">Until</label><br />
                <input id="wd-available-until" type="date" defaultValue="2024-05-20"/>
              </td>
            </tr>
          </table>
          </td>
        </tr>
        <tr>
            <td colSpan={2}>
              <hr />
            </td>
          </tr>
          <tr>
            <td colSpan={2} align="right">
              <button id="wd-cancel" type="button" style={{ marginRight: 8 }}>Cancel</button>
              <button id="wd-save" type="button">Save</button>
            </td>
          </tr>
      </table>
    </div>
);}
