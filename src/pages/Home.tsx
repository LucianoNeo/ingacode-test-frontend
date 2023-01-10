import { useState } from "react";
import Collaborators from "../components/Collaborators";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Projects from "../components/Projects";
import Tasks from "../components/Tasks";

function Home() {
  const [username, setUserName] = useState('Luciano')
  const [close, setClose] = useState(false)
  const [page, setPage] = useState('dashboard')
  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <Header close={close} setClose={setClose} username={username} />
      <Menu open={close} setPage={setPage} setClose={setClose} close={close} />
      {page == 'dashboard' && <Dashboard setPage={setPage} />}
      {page == 'projects' && <Projects />}
      {page == 'tasks' && <Tasks />}
      {page == 'collaborators' && <Collaborators />}
    </div>
  )
}

export default Home
