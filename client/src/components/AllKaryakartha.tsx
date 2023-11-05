import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllKaryakartha = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:1001/getusers/${localStorage.getItem('id')}`); // Replace with your API endpoint
        setUsers(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>All Karyakartha</h1>
      <ul>
        {users.map((user:any) => (
         <div className='card'>
             <li key={user._id}>{user.name} - {user.email}</li>
             {/* <li>{users}</li> */}
         </div>
        ))}
      </ul>
    </div>
  );
};

export default AllKaryakartha;
