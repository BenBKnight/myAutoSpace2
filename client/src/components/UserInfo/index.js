import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../utils/authContext';
import "./style.css";
import API from "../../utils/API"
import { useEffect } from 'react';
import defaultImg from './img/user_avatar.png';

function UserInfo(props) {

  const [userId, setUserId] = useContext(AuthContext)
  const [hideInput, setHideInput] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [awsRes, setAwsRes] = useState(true);
  const [visablePhoto, setVisablePhoto] = useState(defaultImg)

  const inputShow = () => {
    if (hideInput === false) {
      setHideInput(true)
    } else {
      setHideInput(false)
    }
  };
  const addFile = (e) => {
    setSelectedPhoto(e.target.files[0])
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();// If file selected
    if (selectedPhoto) {
      data.append('profileImage', selectedPhoto, selectedPhoto.name);
      API.downloadPhoto(data)
        .then(res => {
          setUserId({
            ...userId,
            profolioPic: res
          });
          setAwsRes(true)
          updateUser(res)
        })
    }
  }
  const updateUser = (data) => {
    let updateData = [data, userId.id]
    API.updateUserPic(updateData)
      .then((res) => {
        console.log("sucess", res)
      })
  }

  useEffect(() => {
    if (userId.profolioPic) {
      API.uploadPhoto(userId.profolioPic)
        .then(res => {
          setVisablePhoto(res)
        })
    }

  }, [])
  return (
    <div className='userInfoBox' >
      <img className='userAvatar' onClick={inputShow} src={visablePhoto} alt='Profile' />
      <h1 className='userName'>{userId.firstName} {userId.lastName}</h1>
      <div style={{ display: hideInput ? "none" : "contents" }} className="hideInput">
        <label>Profile Pic Upload</label>
        <input onChange={addFile} type="file" />
        <button onClick={handleFormSubmit} style={{ display: !awsRes ? "none" : "contents" }}>Upload! </button>
      </div>
    </div>
  );
}

export default UserInfo;