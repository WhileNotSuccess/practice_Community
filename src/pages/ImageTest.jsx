import React ,{useState} from 'react'
import axios from '../lib/axios'

const ImageTest = () => {
  const [image,setImage] = useState(null)
  const [url,setUrl] = useState('')

  // 이미지 입력을 useState변수에 저장하는 방법
  const onChangeImage = (e)=>{
    setImage(e.target.files[0])
  }

  // 이미지를 백엔드로 보내는 예제
  const onClickUpload = ()=>{
    const formData = new FormData()
    formData.append('image',image)
    axios.post('http://localhost:8000/api/image-upload',formData,{
      headers:{
        'Content-Type':'multipart/form-data'
      }
    })
    .then(res=>res.data)
    .then(data=>console.log(data))
  }
  // 이미지의 url을 사용해서 이미지를 삭제하는 예제
  const onClickDelete = ()=>{
    axios.delete(`http://localhost:8000/api/image-delete?url=${url}`)
    .then(res=>res.data)
    .then(data=>console.log(data))
  }

  return (
    <>
      <input type="file" onChange={onChangeImage} />
      <button onClick={onClickUpload}>업로드</button>
      <input type="text" style={{margin:'10px',width:'300px'}} value={url} onChange={(e)=>setUrl(e.target.value)} placeholder='삭제할 이미지의 url을 입력하고 버튼을 누르세요' />
      <button onClick={onClickDelete}>삭제</button>
    </>
  );
}

export default ImageTest