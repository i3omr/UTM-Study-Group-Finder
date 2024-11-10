import * as React from "react"
interface UserOverviewProps {
    name:string;
   // email: string; // assuming email is a string
   // major: string; // assuming major is a string
  }
  
  export default function Useroverview({ name /* email, major */ }: UserOverviewProps) {
    return (
      <div>
        <h1 className="text-2xl	">Hello, {name}!</h1>
        {/* <h4>{email}</h4>
        <p>{major}</p> */}
      </div>
    );
  }