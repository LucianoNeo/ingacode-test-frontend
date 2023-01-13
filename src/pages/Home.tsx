import { useContext, useEffect, useState } from "react";
import Collaborators from "../components/Collaborators";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import List from "../components/List";
import Loading from "../components/Loading";
import Menu from "../components/Menu";
import Projects from "../components/Projects";
import Tasks from "../components/Tasks";
import { AuthContext } from "../contexts/AuthContext";
import { useMyContext } from "../contexts/MyContext";
import { api } from "../services/Api";



function Home() {
  const [close, setClose] = useState(false)
  const [page, setPage] = useState('dashboard')
  const { setProjects, projects, setTasks, tasks, isLoading, setIsLoading, setCollaborators, dayMinutes, setDayMinutes, monthMinutes, setMonthMinutes } = useMyContext()
  const { user, token } = useContext(AuthContext)

  async function getProjects() {
    try {
      const response = await api.get('/projects')
      setProjects(response.data)
    } catch (error) {
      console.log(error);
    }
  }


  async function getTasks() {
    try {
      const response = await api.get('/tasks')
      setTasks(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  async function getCollaborators() {
    try {
      const response = await api.get('/collaborators')
      setCollaborators(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  async function getDayMinutes() {
    try {
      const response = await api.post('/daytotalminutes', { daySent: new Date() })
      setDayMinutes(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  async function getMonthMinutes() {
    try {
      const response = await api.get('/monthtotalminutes')
      setMonthMinutes(response.data)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {

    async function fetchData() {
      try {

        if (user) {
          if (token) {
            api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${token}`;
          }
          await Promise.all([
            getTasks(),
            getProjects(),
            getDayMinutes(),
            getMonthMinutes(),
            getCollaborators(),
          ]);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);


  return (
    <>
      <div className="overflow-x-hidden overflow-y-hidden">
        <Loading />
        <Header close={close} setClose={setClose} username={user} />
        <Menu open={close} setPage={setPage} setClose={setClose} close={close} />
        {page == 'dashboard' && <Dashboard setPage={setPage} projects={projects} tasks={tasks} dayMinutes={dayMinutes} monthMinutes={monthMinutes} />}

        {/* @ts-ignore */}
        {page == 'projects' && <Projects projects={projects} />}
        {/* @ts-ignore */}
        {page == 'tasks' && <Tasks tasks={tasks} />}
        {page == 'collaborators' && <Collaborators />}
        {page == 'list' && <List />}
      </div>

    </>
  )

}

export default Home
