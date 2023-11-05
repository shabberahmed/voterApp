import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListOfkaryakartha = () => {
  const [users, setUsers] = useState<any>([]);

  const allUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:1001/getusers/${localStorage.getItem('id')}`);
      setUsers(response.data.data[0].data);
      console.log(users[0].data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    allUsers();
  }, []);

  return (
    <div>
      {users.map((user:any, index:any) => (
        <div key={index} className="card">
          <h2>Name: {user.name}</h2>
          <p>VID: {user.vid}</p>
          <p>Part No: {user.partno}</p>
          <p>Tel: {user.tel}</p>
        </div>
      ))}
    </div>
  );
};

export default ListOfkaryakartha;
