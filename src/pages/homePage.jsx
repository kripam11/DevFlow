import {BrowserRouter,Routes,Route,Link,Outlet,useNavigate} from "react-router-dom";
import {TaskIcon} from "../components/task";
import {DashboardIcon} from "../components/dashboard";
import {GoalsIcon} from "../components/goals";
import {NotesIcon} from "../components/notes";
import {useState,useEffect} from "react";
import {Category} from "../components/category";
import {DashboardContent} from "../components/dashboardContent"


const useMediaQuery = (query)=>{
  const [matches,setMatches] = useState(false)
  useEffect(()=>{
  const media = window.matchMedia(query);
  if(media.matches!==matches){
    setMatches(media.matches)
  }
  const listner = ()=>{
    setMatches(media.matches);
  }
  media.addEventListener("change",listner);
  return()=> media.removeEventListener("change",listner);
},[matches,query])
return matches;
}
export function HomePage(){
    return <div>
        <BrowserRouter>
        <Routes>
            <Route element={<HomeLayout />}>
      <Route path="/devFlow" element={<DevFlow />} />
    </Route>
            <Route path = "/devFlow/features" element = {<Features/>}></Route>
            <Route path = "/devFlow/howItWorks" element = {<HowItWorks/>}></Route>
            <Route path = "/devFlow/about" element = {<About/>}></Route>
            <Route path="devFlow/dashboard" element={<Dashboard />}>
  <Route index element={<DashboardHome />} />
  <Route path="add-task" element={<AddTask />} />
  <Route path="view-tasks" element={<ViewTasks />} />
    <Route path="notes" element={<Notes />} />
    <Route path="add-note" element={<AddNote />} /> 
  <Route path="goals" element={<Goals />} />
  <Route path="profile" element={<Profile />} />
</Route>
        </Routes>
        </BrowserRouter>
    </div>
}
function HomeLayout(){
    return <div className = "bg-[#f0fffc] h-screen">
        <div className = "grid grid-cols-8 gap-8 bg-green-200">
        <Link to = "/devFlow" className = "text-xl font-bold col-span-3 py-2 mx-3">DevFlow</Link>
        <Link to = "/devFlow/features" className = "text-lg font:medium col-span-1 py-2">Features</Link>
        <Link to = "/devFlow/howItWorks" className = "text-lg font:medium col-span-1 py-2">How it works</Link>
        <Link to = "/devFlow/about" className = "text-lg font:medium col-span-1 py-2">About</Link>
        <Link to = "/devFlow/dashboard" className = "text-lg font:medium col-span-1 py-2">Dashboard</Link>
        <button className = "text-white col-span-1 text-xl font-bold hover:bg-green-600  bg-green-500 rounded-lg px-2 py-2 justify-self-end mx-3">Get Started</button>
        </div>
        <Outlet/>
    </div>
}

function DevFlow(){
    return <div className = "max-w-7xl mx-auto px-8 bg-[#f0fffc] h-screen">
        <div className = "max-w-xl">
            <h1 className = "text-6xl font-bold mt-20  mb-4">Organise your work.</h1>
        <br/>
        <h1 className = "text-6xl font-bold  mb-4">Achieve your goals.</h1>
        <br/>
        <h1 className = "text-6xl font-bold text-green-500 mb-4">Every day.</h1>
        <p className = "text-gray-500 mb-4 mt-12 text-lg font-medium max-w-md">Devflow helps you manage tasks,notes, and goals in one beautiful dashboard</p>
        <button className = "text-white text-2xl font-bold bg-green-500 hover:bg-green-600  rounded-lg px-8 py-4 mt-10 justify-self-end mx-3">Get Started</button>
        <p className="mt-4 text-gray-500">
    Already have an account?{" "}
    <a href="#" className="text-green-500 font-semibold hover:underline">
        Login
    </a>
</p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="w-72 h-64 p-6 rounded-xl bg-white  shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
                <TaskIcon />
                <p className = "font-bold text-2xl m-2">Tasks</p>
                <p className = "text-lg text-gray-500 font-medium mt-3 max-w-[180px]">Organise and prioritise your tasks.</p>
            </div>
            <div className="w-72 h-64 p-6 rounded-xl bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
                <NotesIcon />
                <p className = "font-bold text-2xl m-2">Notes</p>
                <p className = "text-lg text-gray-500 font-medium mt-3 max-w-[180px]">Capture and organise your thoughts.</p>
            </div>
            <div className="w-72 h-64 p-6 rounded-xl bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
                <GoalsIcon />
                <p className = "font-bold text-2xl m-2">Goals</p>
                <p className = "text-lg text-gray-500 font-medium mt-3 max-w-[180px]">Track progress and achieve your goals.</p>
            </div>
            <div className="w-72 h-64 p-6 rounded-xl bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300">
                <DashboardIcon />
                <p className = "font-bold text-2xl m-2">Dashboard</p>
                <p className = "text-lg text-gray-500 font-medium mt-3 max-w-[180px]">All your productivity in one place.</p>
            </div>
        </div>
    </div>
}
function Dashboard(){
    const [sidebarOpen,setSidebarOpen] = useState(true);
     const isDesktop = useMediaQuery("(min-width : 768px)")
        useEffect(()=>{
          if(isDesktop==false){
            setSidebarOpen(false)
          }
          else{
            setSidebarOpen(true)
          }
        },[isDesktop])
    return <div className = "bg-white flex">
        <Sidebar sidebarOpen = {sidebarOpen} setSidebarOpen = {setSidebarOpen} />
        <div className="flex-1">
        <Outlet />
      </div>
    </div>
}

function Sidebar({setSidebarOpen, sidebarOpen}){
     const navigate = useNavigate();
    if(sidebarOpen){
        return <div className = "h-screen w-48 bg-green-200 top-0 left-0">
        <div classname = "cursor-pointer " onClick = {
            ()=>{
                setSidebarOpen(!sidebarOpen)
        }
        }>
            <Category/>
        </div>
        <div className="flex flex-col space-y-6 mt-6">
        <div className="cursor-pointer hover:bg-green-300 font-normal text-xl p-2 rounded"
        onClick={() => navigate("/devFlow/dashboard")} >
           Dashboard
        </div>
        <div className="cursor-pointer hover:bg-green-300 font-normal  text-xl p-2 rounded" onClick={() => navigate("/devFlow/dashboard/view-tasks")}>
           Tasks
        </div>
        <div className="cursor-pointer hover:bg-green-300 font-normal text-xl p-2 rounded" onClick={() => navigate("/devFlow/dashboard/notes")}>
           Notes
        </div>
        <div className="cursor-pointer hover:bg-green-300 font-normal text-xl p-2 rounded" onClick={() => navigate("/devFlow/dashboard/goals")}>
           Goals
        </div>
        <div className="cursor-pointer hover:bg-green-300 font-normal text-xl p-2 rounded" onClick={() => navigate("/devFlow/dashboard/profile")}>
           Profile
        </div>
        </div>
    </div>
    }
    else {
        return <div className = "top-0 left-0">
           <div classname = "cursor-pointer" onClick = {
            ()=>{
                setSidebarOpen(!sidebarOpen)
        }
        }>
            <Category/>

        </div> 
        </div>
    }
}
function MainContent(){
    const navigate = useNavigate();
    return <div className = "flex-1">
        <h1 className="text-xl font-bold mt-9 ml-36 mb-6">Devflow</h1>
        <div className = "flex flex-wrap gap-6 ml-36  ">
            <div className = "bg-white h-40 w-64 hover:bg-green-300 shadow cursor-pointer rounded">
                <h1 className = "font-semibold text-xl m-2 text-gray-500">Tasks</h1>
                <h1 className = "font-bold text-xl m-2 ">12</h1>
                <p className = "text-xl font-medium text-gray-500 m-2">Total Tasks</p>
            </div>
             <div className = "bg-white h-40 w-64 shadow hover:bg-green-300 cursor-pointer rounded">
                <h1 className = "font-semibold text-xl m-2 text-gray-500">Completed</h1>
                <h1 className = "font-bold text-xl m-2 ">12</h1>
                <p className = "text-xl font-medium text-gray-500 m-2">Tasks Done</p>
            </div>
             <div className = "bg-white h-40 w-64 shadow hover:bg-green-300 cursor-pointer rounded">
                <h1 className = "font-semibold text-xl m-2 text-gray-500">Goals</h1>
                <h1 className = "font-bold text-xl m-2 ">12</h1>
                <p className = "text-xl font-medium text-gray-500 m-2">Active Goals</p>
            </div>
             <div className = "bg-white h-40 w-64 shadow hover:bg-green-300 cursor-pointer rounded">
                <h1 className = "font-semibold text-xl m-2 text-gray-500">Notes</h1>
                <h1 className = "font-bold text-xl m-2 ">12</h1>
                <p className = "text-xl font-medium text-gray-500 m-2">Total Notes</p>
            </div>
        </div>
        <div className = "flex gap-6 mt-12 ml-36 mb-6">
        <button
  onClick={() => navigate("/devFlow/dashboard/add-task")}
  className="bg-green-500 text-white font-semibold text-xl hover:bg-green-600 p-4 rounded"
>
  Add Task
</button>

<button
  onClick={() => navigate("/devFlow/dashboard/view-tasks")}
  className="bg-green-500 text-white font-semibold text-xl hover:bg-green-600  p-4 rounded"
>
  View Tasks
</button>
 </div>
    </div>
}

function CategoryBars(){
    return <div>
        <div>
            Dashboard
        </div>
    </div>
}

function Features(){
    return <div>qwerty</div>
}
function HowItWorks(){
    return <div>wertyu</div>
}
function About(){
    return <div>qwqwerrty</div>
}
function DashboardHome() {
  return <MainContent />;
}

function AddTask() {
    const navigate = useNavigate();
  return <div className = "flex flex-col gap-12 items-center h-screen m-28" >
    <div>
        <p className = "text-2xl font-medium text-gray-500 m-2">Title</p>
        <input type = "text" placeholder="Enter the task" className = "w-[300px] h-[50px] border rounded-md px-3"></input>
    </div>
    <div>
        <p className = "text-2xl font-medium text-gray-500 m-2">Description</p>
        <input type = "text" placeholder="Enter the description" className = "w-[300px] h-[50px] border rounded-md px-3"></input>
    </div>
    <div>
        <p className = "text-2xl font-medium text-gray-500 m-2">Due Date</p>
        <input type = "text" placeholder="Enter the date" className = "w-[300px] h-[50px] border rounded-md px-3"></input>
    </div>

    <div className = "flex gap-4 mt-2">
        <div>
            <button
  className="px-4 py-2 border border-gray-300 text-gray-700  font-semibold text-xl hover:bg-gray-100 rounded  top-0 right-0"
>Cancel Task</button>
        </div>
        <div>
            <button
  onClick={() => navigate("/devFlow/dashboard/view-tasks")}
  className="bg-green-500 hover:bg-green-600 text-white font-semibold text-xl  px-4 py-2 rounded top-0 right-0"
>Create Task</button>
        </div>
    </div>
  </div>
}

function ViewTasks() {
    const navigate = useNavigate();
  return <div>
    <div className = "flex justify-between items-center mt-2 mr-4 ml-4">
           <div>  <h1 className = "font-bold text-4xl">Tasks</h1>
            <p className = "text-xl font-medium text-gray-500">Manage all your tasks in one place.</p>
            </div>
            <div>
                <button
  onClick={() => navigate("/devFlow/dashboard/add-task")}
  className="bg-green-500 hover:bg-green-600  text-white font-semibold text-xl  p-4 rounded top-0 right-0"
>
  Add Task
</button>
            </div>
    </div>
  </div>
}

function Notes() {
 const navigate = useNavigate();
  return <div>
    <div className = "flex justify-between items-center mt-2 mr-4 ml-4">
           <div>  <h1 className = "font-bold text-4xl">Notes</h1>
            </div>
            <div>
                <button
  onClick={() => navigate("/devFlow/dashboard/add-note")}
  className="bg-green-500 hover:bg-green-600  text-white font-semibold text-xl  p-4 rounded top-0 right-0"
>
  Add Note
</button>
            </div>
    </div>
  </div>
}
function AddNote(){
     const navigate = useNavigate();
  return <div className = "flex flex-col gap-12 items-center h-screen m-28" >
    <div>
        <p className = "text-2xl font-medium text-gray-500 m-2">Title</p>
        <input type = "text" placeholder="Enter the task" className = "w-[300px] h-[50px] border rounded-md px-3"></input>
    </div>
    <div>
        <p className = "text-2xl font-medium text-gray-500 m-2">Description</p>
        <input type = "text" placeholder="Enter the description" className = "w-[300px] h-[50px] border rounded-md px-3"></input>
    </div>

    <div className = "flex gap-4 mt-2">
        <div>
            <button
  className="px-4 py-2 border border-gray-300 text-gray-700  font-semibold text-xl hover:bg-gray-100 rounded  top-0 right-0"
>Cancel Note</button>
        </div>
        <div>
            <button
  onClick={() => navigate("/devFlow/dashboard/view-tasks")}
  className="bg-green-500 hover:bg-green-600 text-white font-semibold text-xl  px-4 py-2 rounded top-0 right-0"
>Create Note</button>
        </div>
    </div>
  </div>
}

function Goals() {
  return <div>Goals Page</div>;
}

function Profile() {
  return <div>
    <p className ="font-semibold text-4xl ml-64 mt-4 mb-4" >Profile</p>
    <div className = "flex flex-col justify-center items-center gap-8 mb-4">
        <div className="w-[700px] h-[550px]  bg-green-200 rounded-xl shadow-lg p-6">
            <div className = "flex justify-between items-center p-12">
                <h1 className ="text-2xl font-medium" >Username</h1>
                <h1 className = "text-xl font-medium text-gray-500">asdfghjkl</h1>
            </div>
            <div className = "flex justify-between items-center p-12 ">
                <h1 className ="text-2xl font-medium" >Email</h1>
                <h1 className = "text-xl font-medium text-gray-500">asdfghjkl</h1>
            </div>
            <div className = "flex justify-between items-center p-12 ">
                <h1 className ="text-2xl font-medium" >Bio</h1>
                <h1 className = "text-xl font-medium text-gray-500">asdfghjkl</h1>
            </div>
        </div>
    </div>
  </div>
}