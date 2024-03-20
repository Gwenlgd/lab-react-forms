import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import TableHeader from "./components/TableHeader";
import StudentCard from "./components/StudentCard";

import studentsData from "./assets/students.json";

function App() {
  const [students, setStudents] = useState(studentsData);
  const [fullName, setFullName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("-1");
  const [graduatedYear, setGraduatedYear] = useState(2023);
  const [graduated, setGraduated] = useState(false);

  const handleFullName = (e) => setFullName(e.currentTarget.value);
  const handleImage = (e) => setImage(e.currentTarget.value);
  const handlePhone = (e) => setPhone(e.currentTarget.value);
  const handleEmail = (e) => setEmail(e.currentTarget.value);
  const handleProgram = (e) => setProgram(e.currentTarget.value);
  const handleGraduatedYear = (e) =>
    setGraduatedYear(e.currentTarget.valueAsNumber);
  const handleGraduated = (e) => setGraduated(e.target.checked);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newStudent = {
      fullName,
      email,
      phone,
      program,
      image,
      graduated,
      className: program,
    };

    setStudents([...students, newStudent]);
    resetInputs();
  };

  const resetInputs = () => {
    setFullName("");
    setImage("");
    setPhone("");
    setEmail("");
    setProgram("-1");
    setGraduatedYear(2023);
    setGraduated(false);
  };

  return (
    <div className="App pt-20">
      <Navbar />

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <span>Add a Student</span>
        <div>
          <label>
            Full Name
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              id="fullName"
              value={fullName}
              onChange={handleFullName}
            />
          </label>

          <label>
            Profile Image
            <input
              name="image"
              type="url"
              placeholder="Profile Image"
              id="image"
              value={image}
              onChange={handleImage}
            />
          </label>

          <label>
            Phone
            <input
              name="phone"
              type="tel"
              placeholder="Phone"
              id="phone"
              value={phone}
              onChange={handlePhone}
            />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={handleEmail}
            />
          </label>
        </div>

        <div>
          <label>
            Program
            <select
              name="program"
              id="program"
              value={program}
              onChange={handleProgram}
            >
              <option disabled value="-1">
                -- None --
              </option>
              <option value="Web Dev">Web Dev</option>
              <option value="UXUI">UXUI</option>
              <option value="Data">Data</option>
            </select>
          </label>

          <label>
            Graduation Year
            <input
              name="graduationYear"
              type="number"
              id="graduateYear"
              value={graduatedYear}
              onChange={handleGraduatedYear}
              placeholder="Graduation Year"
              minLength={4}
              maxLength={4}
              min={2023}
              max={2030}
            />
          </label>

          <label>
            Graduated
            <input
              name="graduated"
              type="checkbox"
              id="graduated"
              value={graduated}
              onChange={handleGraduated}
            />
          </label>

          <button type="submit">Add Student</button>
        </div>
      </form>
      {/* FORM END */}

      {/* TABLE/LIST HEADER */}
      <TableHeader />

      {/* STUDENT LIST */}
      {students &&
        students.map((student) => {
          return <StudentCard key={student.email} {...student} />;
        })}
    </div>
  );
}

export default App;
