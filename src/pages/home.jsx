import { useEffect, useState } from "react";
import Card from "../components/cards";
import SwitchTheme from "../components/switchTheme";

export default function Home() {
 const [tasks, setTasks] = useState([]);
 const [currentTask, setCurrentTask] = useState("");
 const [user, setUser] = useState({});

 useEffect(() => {
  async function handleUserData() {
   const result = await fetch("https://api.github.com/users/rootdnh");
   const data = await result.json();
   setUser({ name: data.login, image: data.avatar_url });
  }

  handleUserData();
 }, []);

 function handleCurrentTask(e) {
  const value = e.target.value;
  setCurrentTask(value);
 }

 function handleTaskAdd() {
  if (currentTask) {
    const newTask = {
      task: currentTask,
      name: user.name,
      time: new Date().toLocaleTimeString('pt-bt', {
        hour: "2-digit",
        minute: "2-digit"
      })
    }
   setTasks([...tasks, newTask]);
   setCurrentTask("");
  }
 }

 //I DIDN'T WANT TO MAKE CSS FILE FOR THIS
 const styles = {
  imageStyle: {
   width: "60px",
   paddingLeft: "20px",
  },
  flexBetween: {
   display: "flex",
   justifyContent: "space-between",
   padding: "20px",
  },
  bodySpace: {
   display: "flex",
   flexDirection: "column",
   width: "900px",
  },
  boxLeft: {
   display: "Flex",
   flexDirection: "row",
   justifyContent: "center",
   alignContent: "center",
  },
  button: {
   backgroundColor: "#8257e5",
   border: "none",
   height: "80px",
   borderRadius: "10px",
   fontWeight: "800",
   color: "white",
   marginTop: "20px",
  },
  input: {
   backgroundColor: "#e6e6e6",
   height: "80px",
   borderRadius: "10px",
   fontWeight: "800",
  },
 };

 return (
  <div style={styles.bodySpace}>
   <div style={styles.flexBetween}>
    <p>{user.name}</p>
    <div style={styles.boxLeft}>
     <SwitchTheme />
     <img src={user.image} alt="Foto de perfil" style={styles.imageStyle} />
    </div>
   </div>
   <input
    value={currentTask}
    onChange={(e) => handleCurrentTask(e)}
    style={styles.input}
   />
   <button onClick={handleTaskAdd} style={styles.button}>
    ADICIONAR TAREFA
   </button>
   

   {tasks.map((item) => (
    <Card taskName={item.task} by={item.name} time={item.time}/>
   ))}
  </div>
 );
}
