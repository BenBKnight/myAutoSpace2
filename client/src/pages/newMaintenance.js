import React, { Component } from "react";
import './newMaintenance.css';
import API from "../utils/API";
import FormInputTwo from "../components/FormInputTwo";
import { withRouter } from "react-router-dom";
import Navbar from '../components/Navbar copy';
import NavbarLink from '../components/NavbarLink';
import ActionBtn from '../components/ActionBtn';
import MaintInfoBox from "../components/MaintInfoBox";

class NewMaintenance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      maintToAdd: {
        name: "",
        description: "",
        milage: "",
        parts: "",
        jobDate: "",
        VehicleId: localStorage.getItem("vehicleId"),
        partPhoto: ""
      },
      year: "",
      day: "",
      month: "",
      vehicle: [],
      selectedPartFile: null
    };
  };

  partChangeHandler = (event) => {
    this.setState({
      selectedPartFile: event.target.files[0]
    })
  };
  // PartsUpload = (event) => {
  //   const data = new FormData();// If file selected
  //   if (this.state.selectedPartFile) {
  //     data.append('profileImage', this.state.selectedPartFile, this.state.selectedPartFile.name);
  //     API.downloadPhoto(data)
  //       .then(res => {
  //         this.setState({
  //           maintToAdd: {
  //             ...this.state.maintToAdd,
  //             partPhoto: res
  //           }
  //         });
  //       })
  //   }
  //   // else {
  //   //   console.log('Please upload file', 'red');
  //   // }
  // };

  handleInputChange = event => {
    let value = event.target.value;
    const name = event.target.id;
    this.setState({
      maintToAdd: {
        ...this.state.maintToAdd,
        [name]: value
      }
    });
  };

  handleSelect = event => {
    let value = event.target.value;
    const name = event.target.id;

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();// If file selected
    if (this.state.selectedPartFile) {
      data.append('profileImage', this.state.selectedPartFile, this.state.selectedPartFile.name);
      API.downloadPhoto(data)
        .then(res => {
          this.setState({
            maintToAdd: {
              ...this.state.maintToAdd,
              partPhoto: res
            }
          }, () => {
            this.state.maintToAdd.VehicleId = this.state.vehicleId;
            let newMaint = this.state.maintToAdd;
            newMaint.VehicleId = this.state.vehicleID;
            console.log(newMaint)
            API.maintRecord(newMaint)
              .then((res) => {
                this.props.history.push(`/Vehicles/${this.state.maintToAdd.VehicleId}`)
              })
              .catch(err => {
                console.log(err);
              })
          });
        })
    }
    else {
      this.state.maintToAdd.VehicleId = this.state.vehicleId;
      let newMaint = this.state.maintToAdd;
      newMaint.VehicleId = this.state.vehicleID;
      console.log(newMaint)
      API.maintRecord(newMaint)
        .then((res) => {
          this.props.history.push(`/Vehicles/${this.state.maintToAdd.VehicleId}`)
        })
        .catch(err => {
          console.log(err);
        })
    }
    // this.state.maintToAdd.VehicleId = this.state.vehicleId;
    // let newMaint = this.state.maintToAdd;
    // newMaint.VehicleId = this.state.vehicleID;
    // API.maintRecord(newMaint)
    //   .then((res) => {
    //     this.props.history.push(`/Vehicles/${this.state.maintToAdd.VehicleId}`)
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })

  };

  componentDidMount() {
    let location = this.props.match.params.id;
    this.setState({
      vehicleID: location
    }, () => {
      this.apiCall()
    })
  };

  apiCall = () => {
    API.vehicleById(this.state.vehicleID)
      .then((res) => {
        console.log(res.data[0])
        this.setState({
          vehicle: res.data[0]
        })
      })
      .catch(err => {
        console.log(err)
      })
  };

  signOut = () => { localStorage.removeItem("jwt.Token") }

  render() {
    return (
      <>
        <Navbar>
          <NavbarLink url='/members'>My Garage</NavbarLink>
          <NavbarLink url='/vehicles'>Add Vehicle</NavbarLink>
          <NavbarLink url='/add-maintenance' active={true}>Add Maintenance</NavbarLink>
          <ActionBtn handleClick={this.signOut} url='/'>Sign Out</ActionBtn>
        </Navbar>
        <br></br>
        <br></br>
        <br></br>
        <div className='maintFlex'>
          <div className='addMaintenanceWrapper'>
            <h1 className='addMaintHeader'>New Maintenance</h1>
          </div>
          <div className='addMaintenanceWrapper'>
            <MaintInfoBox vehicle={this.state.vehicle} carMilage={this.state.vehicle.mileage} carVin={this.state.vehicle.vin} carYear={this.state.vehicle.year} carMake={this.state.vehicle.make} carModel={this.state.vehicle.model} />
          </div>
        </div>
        <br></br>
        <div className='maintFlex'>
          <div className='addMaintenanceWrapper'>
            <FormInputTwo setWidth='width100' name='jobName' type='text' label='Job Name' id="name" value={this.state.maintToAdd.name} handleInputChange={this.handleInputChange}></FormInputTwo>
            <FormInputTwo setWidth='width100' name='milage' type='text' label='Milage at Service' id="milage" value={this.state.maintToAdd.milage} handleInputChange={this.handleInputChange}></FormInputTwo>
            <FormInputTwo setWidth='width100' name='jobDate' type='text' label='Service Date' id="jobDate" value={this.state.maintToAdd.jobDate} handleInputChange={this.handleInputChange}></FormInputTwo>
          </div>
          <div className='addMaintenanceWrapper'>
            <textarea className='inputText textArea maintAddTextArea' placeholder='Description' name='description' type='text' label='Description' id="description" value={this.state.description} onChange={this.handleInputChange} />
          </div>
        </div>
        <br />
        <div className='maintFlex' style={{ textAlign: "center" }}>
          <div className='addMaintenanceWrapper' style={{ marginRight: "0", textAlign: "center" }}>
            <div style={{ textAlign: "center" }}>
              <label className='photoFileLabel'>Add Part Photo</label>
              <input
                type="file"
                onChange={this.partChangeHandler}
                style={{ textAlign: "center" }}
              ></input>
            </div>
          </div>
        </div >
        <br></br>
        <br></br>
        <div className='newMaintBtn'>
          <ActionBtn url='#' handleClick={this.handleFormSubmit}>Add Maintenance</ActionBtn>
        </div>
      </>
    );
  }
}
export default withRouter(NewMaintenance);