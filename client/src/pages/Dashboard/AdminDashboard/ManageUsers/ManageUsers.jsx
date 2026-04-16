import axios from "axios";
import { useEffect, useState } from "react";

const ManageUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    const fetchUsers = async () => {
      try {

        const token = localStorage.getItem("access-token");

        console.log("access token", token)

        const res = await axios.get(
          "http://localhost:9000/users",
          {
            headers: {
              authorization: `Bearer ${token}`
            },
            withCredentials: true
          }
        );

        console.log("response --> ", res)

        setUsers(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();

  }, []);

  return (
    <div>
      <h2>Manage Users</h2>

      {users.map(user => (
        <div key={user._id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      ))}

    </div>
  );
};

export default ManageUsers;