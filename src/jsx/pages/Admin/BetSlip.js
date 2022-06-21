import { one, zero } from "big-integer";
import React, { useEffect, useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { ImStopwatch, ImFire } from 'react-icons/im'
import { getusertotalwinnings, UserEventHistory, GetUserWonAmountOnEvent, claimrewards, BoostEvent, userBethistory, AmountStackOnEventByaUser, gettotaluserwageramount } from "../../../web3/betsMVPService";


export default function BetSlip() {
  const [events, setEvents] = useState([])
  const [userHistory, setUserHistory] = useState([])
  const [userTotalWinning, setUserTotalWinning] = useState(0)
  const [totalEvnetUserHistory, setTotalUserEvent] = useState(0)
  const [historyevents, setHistroyEvents] = useState(0)
  const [totaluserBetHistory, setTotalUserBetHistory] = useState(0)
  const [totaluserbetlost, setTotalUserBetLost] = useState(0)


  useEffect(() => {
    const getUserBetData = async () => {
      let check = []
      let stake = 0
      let usereventhty = []
      usereventhty = await UserEventHistory();
      setTotalUserEvent(usereventhty.length)
      const totalwinning = await getusertotalwinnings();
      const userbethty = await userBethistory()
      setTotalUserBetHistory(userbethty.length)
      stake = await gettotaluserwageramount()
      // userbethty.forEach(async (ele) =>{
      //   const amountstake = await AmountStackOnEventByaUser(ele)
      //   stake = Number(amountstake) + stake

      //   setTotalUserBetLost(stake/10**18)
      // })
      setTotalUserBetLost(stake / 10 ** 18)
      setUserTotalWinning(totalwinning)
      const decodestoredevents = JSON.parse(window.localStorage.getItem('events'))

      decodestoredevents.forEach(async (element) => {

        for (let i = 0; i < userBethistory.length; i++) {

          if (Number(element.id) == userbethty[i]) {
            let won = await GetUserWonAmountOnEvent(element.id)
            element.won = won
            check.push(element)

          }
        }

        setUserHistory(check)
      })
    }

    getUserBetData();
  }, [])

  useEffect(() => {
    let check = []
    const getUserBetData = async () => {
      const decodestoredevents = JSON.parse(window.localStorage.getItem('events'))
      decodestoredevents.forEach(async (element) => {
        let x = Object.create(element)
        let won = await GetUserWonAmountOnEvent(element.id)
        // let userWagerAmount = await AmountStackOnEventByaUser(element)
        x.won = won
        // x.userwageramount = userWagerAmount

        check.push(x)
      })
      setEvents(check)
      var ts = Math.round((new Date()).getTime() / 1000);

    }
    getUserBetData();
  }, [])

  const upcommingDate = (time) => {
    var current = Math.round(new Date().getTime() / 1000)
    var seconds = (time / 1000) - current
    var day = Math.floor(seconds / 86400)
    if (day > 0) {
      return day;
    }
    else {
      return 0;
    }
  }

  const Boost = async (id) => {
    await BoostEvent(id)
  }


  const RewardClaim = async (id) => {
    await claimrewards(id);
  }


  const ActiveEvents = (completedCards, index) => {
    return (
      <>
        {completedCards.starttime < Math.round((new Date()).getTime() / 1000) && completedCards.endtime > Math.round((new Date()).getTime() / 1000) ? <div
          className="card my-4"
          key={index}
          style={{ backgroundColor: "#1c1c1c" }}
        >
          <div className="card-body">
            <div
              className="d-flex justify-content-between"
              style={{ fontSize: "12px" }}
            >
              <span className="text-light">
                <GoPrimitiveDot color="green" size={18} /> ACTIVE
              </span>
              <span className="text-secondary">#{completedCards.subcategory}</span>
            </div>
            <h5 className="card-title text-center">
              {completedCards.teamone} <span className="text-danger">vs</span>{completedCards.teamtwo}
            </h5>
            <p
              className="text-center text-light my-3"
              style={{ fontSize: "12px" }}
            >
              POOL SIZE
              <br />
              <span className="fs-6">${Number(completedCards.poolsize / 10 ** 18).toFixed(2)}</span>
            </p>
            <div className="d-flex justify-content-between text-secondary" style={{ fontSize: "12px" }}>
              <ul className="p-0" style={{ listStyle: "none" }}>
                <li>{completedCards.zero}% {completedCards.teamone}</li>
                <li>{completedCards.one}% {completedCards.teamtwo}</li>
                <li>{completedCards.two}% DRAW</li>
              </ul>
              <div>
                <p><ImStopwatch /> 0 DAYS LEFT</p>
                <ImFire size={20} />&nbsp;&nbsp;&nbsp;<button onClick={() => Boost(completedCards.id)} className="btn btn-warning ms-auto fw-bold">
                  BOOST
                </button>
              </div>
            </div>
          </div>
        </div> : ''}
      </>
    );
  };

  const InactiveEvents = (completedCards, index) => {
    return (
      <>
        {Math.round((new Date()).getTime() / 1000) > Number(completedCards.endtime) ? <div
          className="card my-4"
          key={index}
          style={{ backgroundColor: "#1c1c1c" }}
        >
          <div className="card-body">
            <div
              className="d-flex justify-content-between"
              style={{ fontSize: "12px" }}
            >
              <span className="text-light">
                <GoPrimitiveDot color="red" size={18} /> ENDED
              </span>
              <span className="text-secondary">#{completedCards.subcategory}</span>
            </div>
            <h5 className="card-title text-center">
              {completedCards.teamone}<span className="text-danger"> vs </span>{completedCards.teamtwo}
            </h5>
            <p
              className="text-center text-light my-3"
              style={{ fontSize: "12px" }}
            >
              POOL SIZE
              <br />
              <span className="fs-6">${Number(completedCards.poolsize / 10 ** 18).toFixed(2)}</span>
            </p>
            <br />
            <br />
            <p
              className="text-center text-light my-3"
              style={{ fontSize: "12px" }}
            >
              You Won
              <span className="fs-6"> ${completedCards.won / 10 ** 18}</span>
            </p>
            <div className="d-flex justify-content-between text-secondary" style={{ fontSize: "12px" }}>
              <ul className="p-0" style={{ listStyle: "none" }}>
                <li>{completedCards.zero}% {completedCards.teamone}</li>
                <li>{completedCards.one}% {completedCards.teamtwo}</li>
                <li>{completedCards.two}% DRAW</li>
              </ul>
              <div>
                <p><ImStopwatch />0 DAYS LEFT</p>
                <ImFire size={20} />&nbsp;&nbsp;&nbsp;{completedCards.won > 0 ? '' : <button onClick={() => RewardClaim(completedCards.id)} className="btn btn-success ms-auto fw-bold">
                  Claim
                </button>}&nbsp;&nbsp;&nbsp;
                <button onClick={() => Boost(completedCards.id)} className="btn btn-warning ms-auto fw-bold">
                  BOOST
                </button>
              </div>
            </div>
          </div>
        </div> : ''}
      </>
    );
  };

  const UpComming = (completedCards, index) => {
    return (
      <>
        {completedCards.starttime > Math.round((new Date()).getTime() / 1000) ? <div
          className="card my-4"
          key={index}
          style={{ backgroundColor: "#1c1c1c" }}
        >
          <div className="card-body">
            <div
              className="d-flex justify-content-between"
              style={{ fontSize: "12px" }}
            >
              <span className="text-light">
                <GoPrimitiveDot color="#009dff" size={18} /> UPCOMING
              </span>
              <span className="text-secondary">#{completedCards.subcategory}</span>
            </div>
            <h5 className="card-title text-center">
              {completedCards.teamone} <span className="text-danger">vs</span>{completedCards.teamtwo}
            </h5>
            <p
              className="text-center text-light my-3"
              style={{ fontSize: "12px" }}
            >
              POOL SIZE
              <br />
              <span className="fs-6">${Number(completedCards.poolsize / 10 ** 18).toFixed(2)}</span>
            </p>
            <br />
            <br />

            <div className="d-flex justify-content-between text-secondary" style={{ fontSize: "12px" }}>
              <ul className="p-0" style={{ listStyle: "none" }}>
                <li>{completedCards.zero}% {completedCards.teamone}</li>
                <li>{completedCards.one}% {completedCards.teamtwo}</li>
                <li>{completedCards.two}% DRAW</li>
              </ul>
              <div>
                <p><ImStopwatch /> {upcommingDate(completedCards.starttime)} DAYS LEFT</p>
                {/* <ImFire size={20}/>&nbsp;&nbsp;&nbsp;<button onClick={()=>RewardClaim(completedCards.id)} className="btn btn-warning ms-auto fw-bold">
                Claim
                </button> */}
              </div>
            </div>
          </div>
        </div> : ''}
      </>
    );
  };


  return (
    <div className="container-fluid betslip-main">
      {/* CARD STAT */}
      <div className="row py-3 px-2 mb-3 justify-content-xl-around justify-content-lg-between justify-content-center row-cols-auto">
        <div className="col px-3 py-2 TS rounded my-3 mx-1 col-w">
          <span>TOTAL</span>
          <h5>BETS MADE</h5>
          <hr className="text-light" />
          <p>{totaluserBetHistory}</p>
        </div>
        <div className="col px-3 py-2 TS rounded my-3 mx-1 col-b">
          <span>TOTAL</span>
          <h5>EVENT CREATED</h5>
          <hr className="text-primary" />
          <p>{totalEvnetUserHistory}</p>
        </div>
        <div className="col px-3 py-2 TS rounded my-3 mx-1 col-r">
          <span>TOTAL</span>
          <h5>AMOUNT WAGERED</h5>
          <hr className="text-danger" />
          <p>${(totaluserbetlost)}</p>
        </div>
        <div className="col px-3 py-2 TS rounded my-3 mx-1 col-g">
          <span>TOTAL</span>
          <h5>AMOUNT WON</h5>
          <hr className="text-success" />
          <p>${userTotalWinning / 10 ** 18}</p>
        </div>
      </div>

      {/* BET SLIPS */}
      <div
        className="row py-3 px-3 px-xxl-5 px-sm-2 mb-3"
        style={{ borderBottomLeftRadius: "0" }}
      >
        <div className="col-md-2">
          <select
            className="form-select bg-dark border-0 text-light py-3"
            id="specificSizeSelect"
            onChange={(e) => setHistroyEvents(e.target.options.selectedIndex)}
          >
            <option selected >ACTIVE</option>
            <option >UPCOMING</option>
            <option >HISTORY</option>
          </select>
        </div>
        {historyevents == 0 && events.length > 0 ?
          <div className="container activeBets">
            {events.map((data) => ActiveEvents(data))}
          </div> : historyevents == 1 && events.length > 0 ?
            <div className="container activeBets">
              {events.map((data) => UpComming(data))}
            </div> : historyevents == 2 && events.length > 0 ?
              <div className="container activeBets">
                {userHistory.map((data) => InactiveEvents(data))}
              </div> : ''}
      </div>
    </div>
  );

}
