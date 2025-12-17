"use client"

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  const handleClickTechWidHm =()=>{
    router.push('/pages/auth/login')
  }
  return (
    <div className={`${styles.page} proj-backgroundColor`}>
      <div>
        <h1>Welcome To Tech With MH</h1>
        <h3 onClick={handleClickTechWidHm} className="center-align mt-4" style={{cursor:'pointer'}} >
          Click To Start
        </h3>
      </div>
    </div>
  );
}
