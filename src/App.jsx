import "./index.css";
import { useState, useEffect } from "react";
import supabase from "./SuperbaseClient";
import Auth from "./Components/Auth";
import Notes from "./Components/Notes";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if(!session)
  {
    return <Auth />;
  }
  return (
    <div className="">
      <Notes/>
    </div>
  )
}