export async function createUser(user, accessTokenRaw) {
  try {
    const response = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessTokenRaw}`,
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function getUserById(id) {
  try{
    const response = await fetch(`http://localhost:4000/users/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}; Cannot get user by id`);
    }

    const data = await response.json();
    return data;

  }catch(error){
    console.error("ERROR: " + error)
    throw error;
  }
  
}
