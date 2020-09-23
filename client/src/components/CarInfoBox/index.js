import React from 'react';
import "./style.css";
import { Link } from "react-router-dom";
import defaultPhoto from "../FormImg/img/car_gray.png"
import { useEffect } from 'react';
import API from "../../utils//API";
import { useState } from 'react';
import ActionBtn from "../ActionBtn/index"

function CarInfoBox(props) {
  const [photo, setPhoto] = useState(defaultPhoto);
  const vehiclePic = props.vehicle.vehiclePhoto;
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [hideMilage, setHideMilage] = useState(false);
  // const []
  const [milage, setMilage] = useState("")

  useEffect(() => {

    if (vehiclePic) {
      API.uploadPhoto(vehiclePic)
        .then((res) => {
          if (res.code === "NoSuchKey") {
            return;
          } else {
            setPhoto(res)
          }
        })
    } else {
      return
    }

  }, [])
  const deleteVehicle = () => {
    if (confirmDelete === false) {
      setConfirmDelete(true)
    } else {
      setConfirmDelete(false)
    }
  };
  const DELETECAR = () => {
    let carId = props.vehicle.id
    API.deleteCar(carId)
      .then(res => {
        setConfirmDelete(false)
      })
  };
  const showInput = () => {
    if (hideMilage === false) {
      setHideMilage(true)
    } else {
      setHideMilage(false)
    }
  }
  const milageUpdate = (e) => {
    setMilage(e.target.value)
  }
  const handleMilageUpdate = () => {
    setHideMilage(false);
    let carId = props.vehicle.id
    let newMilage = milage
    let data = [carId, newMilage]
    API.updateMileage(data)
      .then(res => {
        console.log(res)
      })
  }
  return (
    <div className='carInfoBox'>
      <span className='carBoxTopInfo'>
        <img className='carBoxImg' src={photo} alt='Vehicle' />
        <div>
          <h2 className='carBoxTitle'>{props.vehicle.year} {props.vehicle.make} {props.vehicle.model}</h2>
          <br></br>
          <p className='carBoxText'>Milage: {props.vehicle.mileage}</p>
          <p className='carBoxText'>Vin: {props.vehicle.vin}</p>
        </div>
      </span>
      <br></br>
      <span className='carBoxMoreInfo'>
        <div>
          <p className='carBoxText'>Last Oil Change: {props.vehicle.mileage}</p>
          <p className='carBoxText'>Condition: {props.vehicle.condition}</p>
          <p className='carBoxText'>Accidents: {props.vehicle.accidents}</p>
        </div>
        <div className='carBoxLinkContainer'>
          <Link to={`/vehicles/${props.vehicle.id}`}>
            <p className='carBoxLink'>View Vehicle</p>
          </Link>
          <p className='carBoxLink' onClick={showInput}>Update Milage</p>
          <input type="text" style={{ display: hideMilage ? "" : "none" }} name="milage" onChange={milageUpdate} ></input>
          <ActionBtn url="#" handleClick={handleMilageUpdate} style={{ display: hideMilage ? "" : "none" }} >Update!</ActionBtn>
          <Link to={`/NewMaintenance/${props.vehicle.id}`}>
            <p className='carBoxLink'>New Maintenance</p>
          </Link>
          <p onClick={deleteVehicle} className='carBoxLinkRed'>Delete</p>
          <p onClick={DELETECAR} style={{ display: confirmDelete ? "contents" : "none" }} className="carBoxLinkRed">Confirm Delete?</p>
        </div>
      </span>
    </div>
  );
}

export default CarInfoBox;