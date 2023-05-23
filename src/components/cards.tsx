import React from "react";

export default function Card(props) {
 
  const styles = {
  task: {
   display: "flex",
   justifyContent: "space-between",
   alignContent: "center",
   boxSizing: "border-box",
   width: "100%",
   backgroundColor: "#42d3ffcc",
   height: "100%",
   borderRadius: "10px",
   fontWeight: "800",
   marginTop: "10px",
   padding: "30px 20px 30px 20px"

  },
 };

 return (
  <div style={styles.task}>
   <strong>{props.taskName}</strong>
   <div>
   <strong>por <u>{props.by}</u></strong>
   <strong>, às {props.time}</strong>
   </div>
  </div>
 );
}
