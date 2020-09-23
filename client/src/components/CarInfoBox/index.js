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
  const [hideMileage, setHideMileage] = useState(false);
  // const []
  const [mileage, setMileage] = useState("")

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
    if (hideMileage === false) {
      setHideMileage(true)
    } else {
      setHideMileage(false)
    }
  }
  const mileageUpdate = (e) => {
    setMileage(e.target.value)
  }
  const handleMileageUpdate = () => {
    setHideMileage(false);
    let carId = props.vehicle.id
    let newMileage = mileage
    let data = [carId, newMileage]
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
          <p className='carBoxText'>Mileage: {props.vehicle.mileage}</p>
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
          <p className='carBoxLink' onClick={showInput}>Update Mileage</p>
          <input type="text" style={{ display: hideMileage ? "" : "none" }} name="mileage" onChange={mileageUpdate} ></input>
          <ActionBtn url="#" handleClick={handleMileageUpdate} style={{ display: hideMileage ? "" : "none" }} >Update!</ActionBtn>
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