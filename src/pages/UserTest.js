import React from 'react'
import { useAuth } from '../hooks/auth'

const UserTest = () => {
  
  const {user} = useAuth({middleware:'auth'})
  const {logout} = useAuth();
  if(!user){
    return <>로딩중</>
  }
  return (
    <div>
      <h1>{user?.nick_name}</h1>
      <h1>{user?.email}</h1>
      <button onClick={logout}>로그아웃</button>
    </div>
  )
}

export default UserTest