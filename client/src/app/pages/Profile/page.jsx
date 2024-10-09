//Profile page
"use client"
import { UserContext } from "../../context/UserContext.js"
import { useContext, useEffect, useState } from "react";
import { getUserById } from "../../../services/userService.js";

export default function Profile() {
    const { user, setUser } = useContext(UserContext);
    const [userInDb, setUserInDb] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
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
                    console.log("user is not null so current user can be set directly")
                    currentUser = user;
                }
                console.log("user should not be null, logically...")
                console.log(currentUser.id);
                const data = await getUserById(currentUser.id);
                setUserInDb(data);
                console.log("find the user!" + data.id);
                setLoading(false);
            } catch(e){
                console.error("Error finding user:", e);
            }
        }

        console.log("find user will be execute..");    
        findUser();
        

    }, []);

    
    if(loading) {
        return <div>loading...</div>;
    }



    return (
        <div>

            <div className="profile_container">
                <p>{userInDb.id ? userInDb.id : ""}</p>
                <p>{userInDb.username ? userInDb.username : ""}</p>
                <p>{userInDb.email ? userInDb.email : ""}</p>
                <p>{userInDb.name ? userInDb.name : ""}</p>
                <p>{userInDb.picture ? userInDb.picture : ""}</p>
                <p>{userInDb.description ? userInDb.description : ""}</p>
                hii

            </div>
            

        </div>
        
    )
}

