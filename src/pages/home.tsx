import { useEffect, useState } from "react";
import Card, {CardProps} from "../components/cards";
import SwitchTheme from "../components/switchTheme";
import React from "react";

type User = {
  name: string,
  image: string
}

export default function Home() {
 const [tasks, setTasks] = useState<CardProps[]>([]);
 const [currentTask, setCurrentTask] = useState<string>("");
 const [user, setUser] = useState<User>({} as User);

 useEffect(() => {
  async function handleUserData() {
   const result = await fetch("https://api.github.com/users/rootdnh");
   const data = await result.json();
   setUser({ name: data.login, image: data.avatar_url });
  }

  handleUserData();
 }, []);

 function handleCurrentTask(e: React.ChangeEvent<HTMLInputElement>) {
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
 interface Styles {
  imageStyle: React.CSSProperties;
  flexBetween: React.CSSProperties;
  bodySpace: React.CSSProperties;
  boxLeft: React.CSSProperties;
  button: React.CSSProperties;
  input: React.CSSProperties;
 };

 const styles: Styles = {
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
    <Card task={item.task} name={item.name} time={item.time}/>
   ))}
  </div>
 );
}
