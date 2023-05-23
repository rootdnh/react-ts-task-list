import { useEffect, useState } from "react"
import Card from "../components/cards";
import SwitchTheme from "../components/switchTheme";

export default function Home() {

  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("")
  const [user, setUser] = useState({
    name: "",
    image: ""
  }); 

  useEffect(()=>{
   async function handleUserData(){
    // const result = await fetch("https://api.github.com/users/rootdnh");
    // const data = await result.json();
    // setUser({name: data.name, image: data.avatar_url})
    
  }

  handleUserData();
  }, []);

  useEffect(()=>{
    console.log(tasks)
  }, [tasks]);

  
  function handleCurrentTask(e){
    const value = e.target.value;
    setCurrentTask(value)
  }

  function handleTaskAdd(){
   if(currentTask){
    setTasks([...tasks, currentTask]);
    setCurrentTask("")
    }
  }

  //I DIDN'T WANT TO MAKE CSS FILE FOR THIS
  const imageStyle = {
    width: "60px"
  }
  const flexBetween = {
    display: "flex",
    justifyContent: "space-between",

  }
  const bodySpace = {
    display: 'flex',
    flexDirection: "column",
  
   
    width: "900px",

  }

  return (
    <div style={bodySpace}>
    <div style={flexBetween}>
      <p>{user.name}</p>
      <div>
        <SwitchTheme/>
        <img src={user.image} alt="Foto de perfil" style={imageStyle}/>
      </div>
      </div>
      <input value={currentTask} onChange={(e)=> handleCurrentTask(e)} />
      <button onClick={handleTaskAdd}>Add</button>  

      {
        tasks.map(item=>(
          <Card taskName={item}/>
        ))
      }
     
    </div>
  )
}


