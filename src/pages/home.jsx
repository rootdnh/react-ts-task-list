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
    const result = await fetch("https://api.github.com/users/rootdnh");
    const data = await result.json();
    setUser({name: data.name, image: data.avatar_url})
    
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
  const styles = {
  imageStyle: {
    width: "60px",
    paddingLeft: "20px"
    },
  flexBetween: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px"
  },
  bodySpace: {
    display: 'flex',
    flexDirection: "column",
    width: "900px",
    },
  boxLeft: {
    display: "Flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
   }
  }


  return (
    <div style={styles.bodySpace}>
    <div style={styles.flexBetween}>
      <p>{user.name}</p>
      <div style={styles.boxLeft}>
        <SwitchTheme  />
        <img src={user.image} alt="Foto de perfil" style={styles.imageStyle}/>
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


