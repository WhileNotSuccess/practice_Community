import React from 'react'
import { useAuth } from '../hooks/auth'
import { useNavigate } from 'react-router-dom';
const UserTest = () => {
  const navigate = useNavigate();
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
      <button onClick={()=>navigate('/email-verify')}>이메일 인증</button>
      <button onClick={()=>navigate('/password-reset')}>비밀번호를 까먹으셨나요?</button>
    </div>
  )
}

export default UserTest