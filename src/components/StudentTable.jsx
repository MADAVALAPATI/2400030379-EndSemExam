import React, { useEffect, useState } from "react";

function StudentTable() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);   // for loading state
  const [error, setError] = useState(null);       // for error state

  useEffect(() => {
    // Dummy API (you can replace this with your own backend URL)
    const API_URL = "https://dummyjson.com/users?limit=10";

    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await response.json();
        // dummyjson returns { users: [...] }
        setStudents(data.users || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading student data...</p>;
  }

  if (error) {
    return (
      <p style={{ color: "red", textAlign: "center" }}>
        Error: {error}
      </p>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Details</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Age</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td style={tdStyle}>{student.id}</td>
              <td style={tdStyle}>
                {student.firstName} {student.lastName}
              </td>
              <td style={tdStyle}>{student.email}</td>
              <td style={tdStyle}>{student.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  background: "#f5f5f5",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "8px",
};

export default StudentTable;