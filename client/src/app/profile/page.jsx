//Profile page
"use client";
import style from "./page.module.scss";
import { UserContext } from "../context/UserContext.js";
import { useContext, useEffect, useState } from "react";
import { getUserById } from "../../services/userService.js";
import Image from "next/image";


export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [userInDb, setUserInDb] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function findUser() {
      try {
        let currentUser;
        if (!user) {
          console.log("fetching from local storage");
          console.log(localStorage.getItem("user"));
          const storedUser = await JSON.parse(localStorage.getItem("user"));
          setUser(storedUser);
          currentUser = storedUser;
        } else {
          console.log("user is not null so current user can be set directly");
          currentUser = user;
        }
        console.log("user should not be null, logically...");
        console.log(currentUser.id);
        const data = await getUserById(currentUser.id);
        setUserInDb(data);
        console.log("find the user!" + data.id);
        setLoading(false);
      } catch (e) {
        console.error("Error finding user:", e);
      }
    }

    console.log("find user will be execute..");
    findUser();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className={style.pageContainer}>
      <div className={style.profilAndInfoContainer}>
        <div className={style.profilePicContainer}>

          <Image 
          src="/images/meeting.png" 
          alt="profile pic"
          object-fit="cover"
          fill = {true}
          />

        </div>

        <div className={style.infoContainer}>
          
          <table className={style.infoTable}>
            
            <tbody>
              <tr>
                  <th>Username</th>
                  <td>{userInDb.username ? userInDb.username : ""}</td>
              </tr>
              <tr>
                  <th>Email</th>
                  <td>{userInDb.email ? userInDb.email : ""}</td>
              </tr>
              <tr>
                  <th>Name</th>
                  <td>{userInDb.name ? userInDb.name : ""}</td>
              </tr>
              <tr>
                  <th>Personal Description</th>
                  <td>{userInDb.description ? userInDb.description : ""}</td>
              </tr>
            </tbody>
          </table>

          <div className={style.buttonContainer}>
            <button className={style.editButton}>Edit</button>
          </div>
     
        </div>
      </div>

      <div className={style.postContainer}></div>

    </div>
  );
}
