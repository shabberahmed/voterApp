import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminPage = () => {
    const navigate=useNavigate()
    function gotoUserLogin(){
        navigate('/user/signup')
    }
    const goToList=async()=>{
        navigate('/list')
    }
    const goToallKaryakartha=()=>{
        navigate('/all')
    }
    const logout=()=>{
        localStorage.clear()
        navigate('/')
    }
  return (
    <div className='flex flex-row m-5 gap-5 items-center'>
        <button className='btn btn-danger' onClick={logout}>Logout</button>
        <div style={{width:300,height:100}} className='bg-green-200 text-center' onClick={gotoUserLogin}>add karyakartha</div>
        <div  style={{width:300,height:100}} className='bg-green-200' onClick={goToallKaryakartha} >list of karyakartha</div>
        <div  style={{width:300,height:100}} className='bg-green-200' onClick={goToList} >froms submit by karyakartha</div>
    </div>
  )
}

export default AdminPage