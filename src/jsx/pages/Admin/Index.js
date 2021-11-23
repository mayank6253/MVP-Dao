import React, { Component, Fragment } from "react";
import AppHeader from "../../components/Elements/AppHeader";
import AOS from "aos";
import "aos/dist/aos.css";
import {getMainChainInformation, initInstance, loginProcess} from './../../../web3/web3'
import {createEvent, getEvent, getActiveEvents, validateEvent} from './../../../web3/betsMVPService'

import arrow_down from "../../../images/arrow-down.png";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabTop: 1,
      is_create: true,
      handelToggle: false,
      time:0,
      endtime:0,
      sub_category:'',
      event1:'',
      event2:'',
      name:'',
      allevents:[],
      occured:0,
      id:null
    };
  }
  componentDidMount = async() => {
    let event;
    let active_event;
    await initInstance();
    AOS.init();
    active_event = await getActiveEvents();
    for (let i = 0; i <= active_event.length; i++){
      event = await getEvent(i);
      if(event[9] === false){
        
        this.state.allevents.push(event);
      }
      
    }
    
  };

  handelClick = (tab) => {
    this.setState({
      activeTabTop: tab,
      is_create: true,
    });
  };

  createPreview = () => {
    this.setState({
      is_create: false,
    });
  };
  handelToggle = (eventid) => {
    let handelToggle = this.state.handelToggle;
    this.setState({
      handelToggle: handelToggle ? false : true,
      id: eventid
    });


  };

  Onsubmit = async(event) => {
    event.preventDefault();
    const starttime = parseInt((new Date(this.state.time).getTime() / 1000).toFixed(0))
    const endtime = parseInt((new Date(this.state.endtime).getTime() / 1000).toFixed(0))
    console.log("create event", this.state.sub_category, starttime, endtime, this.state.name, this.state.event1, this.state.event2)
    const Event = {
      sub_category: this.state.sub_category,
      name: this.state.name,
      time: starttime,
      endTime: endtime,
      event1: this.state.event1,
      event2: this.state.event2,
    }
    await createEvent(Event);
  }

  timecovert = (time) =>{
    const date = new Date(time*1000);
    return date.toLocaleDateString("en-US");
  }

  teamfisrt = () => {
    this.setState({
      occured:0
    })
    
  }

  teamsecond = () => {
    this.setState({
      occured:1
    })
    
  }

  teamthird = () => {
    this.setState({
      occured:2
    })
    
  }

  preview = async(event_id) => {
    this.setState({
      id:event_id,
    }, () => {
      console.log("id is",this.state.id, this.state.occured);
  })
   await validateEvent(event_id, this.state.occured)
  }

  
  render() {
    console.log("all events are", this.state.allevents)
    

    return (
      <Fragment>
          <AppHeader />
        <div className="container-fluid px-md-5 mt-2">
          <div className="space-100"></div>
          <div className="d-flex flex-wrap">
            <div className="me-md-4 me-2">
              <button
                className={`btn admin-match-button ${
                  this.state.activeTabTop == 1 ? " active" : ""
                }`}
                onClick={() => this.handelClick(1)}
              >
                Create Events
              </button>
            </div>
            <div className="">
              <button
                className={`btn admin-match-button ${
                  this.state.activeTabTop == 2 ? " active" : ""
                }`}
                onClick={() => this.handelClick(2)}
              >
                Validate Events
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="match-main-div">
                <div className="theam-bg-dark mt-5 mt-md-5 p-1 p-md-5">
                  {this.state.activeTabTop == 1 ? (
                    <form className="admin-form" onSubmit={this.Onsubmit}>
                      {this.state.is_create ? (
                        <>
                          <div className="mb-3 mb-md-5 maindiv">
                            <label for="category" className="form-label">
                              Category
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="category"
                              value={this.state.sub_category} 
                              onChange={(e) => this.setState({sub_category:e.target.value})}
                              aria-describedby=""
                            />
                          </div>
                          <div className="mb-3 mb-md-5 maindiv">
                            <label for="Event" className="form-label">
                              Event
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="Event"
                              value={this.state.name} 
                              onChange={(e) => this.setState({name:e.target.value})}
                              aria-describedby=""
                            />
                          </div>
                          <div className="mb-3 mb-md-5 maindiv">
                            <label for="Start_date" className="form-label">
                              Start Time
                            </label>
                            <input
                              className="form-control"
                              id="Start_date"
                              type='datetime-local'
                              value={this.state.time} 
                              onChange={(e) => this.setState({time:e.target.value})}
                              placeholder="In unix fomate"
                              aria-describedby=""
                            />
                          </div>
                          <div className="mb-3 mb-md-5 position-relative maindiv">
                            <label for="odd_1" className="form-label">
                              End Time
                            </label>
                            <input
              
                              className="form-control"
                              id="Start_date"
                              type="datetime-local"
                              value={this.state.endtime} 
                              onChange={(e) => this.setState({endtime:e.target.value})}
                              placeholder="In unix fomate"
                              aria-describedby=""
                            />
                          </div>
                          <div className="mb-3 mb-md-5 position-relative maindiv">
                            <label for="odd_2" className="form-label">
                              Event one
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="Start_date"
                              value={this.state.event1} 
                              onChange={(e) => this.setState({event1:e.target.value})}
                              aria-describedby=""
                            />
                          </div>
                          <div className="mb-3 mb-md-5 position-relative maindiv">
                            <label for="odd_3" className="form-label">
                              Event Two
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="Start_date"
                              value={this.state.event2} 
                              onChange={(e) => this.setState({event2:e.target.value})}
                              aria-describedby=""
                            />
                          </div>
                          <div className="mb-3 mb-md-5 ">
                            <button
                              className="btn"
                              type='submit'
                            >
                              Create Event
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="mb-3 mb-md-5">
                            <label for="category" className="form-label">
                              Category
                            </label>
                            <p>Soccer</p>
                          </div>
                          <div className="mb-3 mb-md-5">
                            <label for="Event" className="form-label">
                              Event
                            </label>
                            <p>Chealsea vs machester</p>
                          </div>
                          <div className="mb-3 mb-md-5">
                            <label for="Start_date" className="form-label">
                              Start date
                            </label>
                            <p>Start date</p>
                          </div>
                          <div className="mb-3 mb-md-5">
                            <label for="odd_1" className="form-label">
                              odd 1
                            </label>
                            <p>Chealsea</p>
                            <p>Machester</p>
                            <p>Draw</p>
                          </div>
                          <div className="mb-3 mb-md-5">
                            <button
                              className="btn"
                              onClick={() => this.handelClick(2)}
                            >
                              Create event
                            </button>
                          </div>
                        </>
                      )}
                    </form>
                  ) : (
                    <>

{this.state.allevents.map((item) => (
                      <div>
                        <div className="admin-card-view px-3 py-3 mb-5">
                          <p onClick={() => this.handelToggle()}>
                          <p className="title w-100">Event id {item[0]}</p>
                            {item[7]} vs {item[8]}
                          </p>
                          <div className="row mt-4">
                            <div className="col-md-7">
                              <div
                                className="d-flex mb-3"
                                onClick={() => this.handelToggle()}
                              >
                                <p className="title w-100">Created</p>
                                <p className="date text-end w-100">{this.timecovert(item[5])}</p>
                              </div>
                              <div
                                className="d-flex mb-0"
                                onClick={() => this.handelToggle()}
                              >
                                <p className="title w-100">
                                  total participants
                                </p>
                                <p className="date text-end w-100">{item[12]}</p>
                              </div>
                              {this.state.handelToggle ? (
                                <div className="toggle-card"   data-aos="fade-down"
                                data-aos-duration="400"
                                data-aos-easing="linear">
                                  <div className="d-flex mt-5 mb-4">
                                    <h4 className="w-100">Winning odd</h4>
                                  </div>
                                  <div className="d-flex mb-3" onClick={() => this.teamfisrt()}>
                                    <p className="title w-100">
                                      Machester unity
                                    </p>
                                    <p className="text-end w-100">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        
                                      />
                                    </p>
                                  </div>
                                  <div className="d-flex mb-3" onClick={() => this.teamsecond()}>
                                    <p className="title w-100">Chealsea</p>
                                    <p className="text-end w-100">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                       
                                      />
                                    </p>
                                  </div>
                                  <div className="d-flex mb-3" onClick={() => this.teamthird()}>
                                    <p className="title w-100">Draw</p>
                                    <p className="text-end w-100">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                      />
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-4 d-none d-md-flex justify-content-center align-items-center">
                              {this.state.handelToggle ? (
                                ""
                              ) : (
                                <button
                                  className="btn button-1"
                                  onClick={() => this.preview(item[0])}
                                >
                                  validate
                                </button>
                              )}
                            </div>

                            {this.state.handelToggle ? (
                              <div className="col-md-12 toggle-card"   data-aos="fade-down"
                              data-aos-duration="500"
                              data-aos-easing="linear">
                                <div className="d-flex mt-4">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      value=""
                                      id="flexCheckDefault"
                                    />
                                    <label
                                      className="form-check-label title"
                                      for="flexCheckDefault"
                                    >
                                      I have previewed the selection
                                    </label>
                                  </div>
                                </div>
                                <div className="d-flex mt-5">
                                  <button className="btn button-2"onClick={() => this.preview(item[0])}>
                                    validate
                                  </button>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                          
 ))}
                          

                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Index;
