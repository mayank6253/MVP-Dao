import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { MdOutlineArrowForwardIos, MdArrowDropDown } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import { FaTeamspeak } from 'react-icons/fa'
import { pausebet, Unpausebet, Ispausebet } from "../../../web3/betsMVPService";
import { donatefund, apporveBUSD, isapproved } from './../../../web3/DonateMethos'

export default function SelfHelp() {

  const [pausingtime, setPausingTime] = useState(0)
  const [ispaused, setIspaused] = useState(false)
  const [pausetimeend, setPauseTimeEnd] = useState(0)
  const [amountDonate, setAmountDonate] = useState(0)

  useEffect(() => {
    const init = async () => {
      const isbetpaused = Ispausebet();
      const endpaushtime = window.localStorage.getItem('duration')
      setPauseTimeEnd(endpaushtime)
      setIspaused(isbetpaused)
    }
    init();
  }, [])

  const formatRemainingTime = (time) => {
    // const minutes = Math.floor((time % 3600) / 60);
    // const seconds = time % 60;

    // return `${minutes}:${seconds}`;
    console.log(time)
    var d = Math.floor(time / (3600 * 24));
    var h = Math.floor((time % (3600 * 24)) / 3600);
    var m = Math.floor((time % 3600) / 60);
    var s = Math.floor(time % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " DAY " : " DAYS ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " HOUR " : " HOURS ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " MINUTE " : " MINUTES ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " SECOND" : " SECONDS") : "";
    return `${dDisplay + hDisplay + mDisplay + sDisplay}`;
  };

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer text-danger">00 00:00:00</div>
    }

    return (
      <div className="timer text-center w-75">
        <div className="value text-light">
          {formatRemainingTime(remainingTime)}
        </div>
        <div className="text text-secondary">REMAINING</div>
      </div>
    );
  };

  const pause = async (event) => {
    if (ispaused) {
      const data = await Unpausebet()
      if (data.status) {
        setPausingTime(0)
        setIspaused(false)

        window.localStorage.removeItem('duration')
      }
      return true
    }
    const duration = parseInt((new Date(pausingtime).getTime() / 1000).toFixed(0),)
    const data = await pausebet(duration)
    if (data.status) {
      setIspaused(true)
      window.localStorage.setItem('duration', duration)
    }
  }
  const Donatethem = async () => {
    const Isapprove = await isapproved();
    if (Number(Isapprove) > amountDonate) {
      await donatefund(amountDonate);
    }
    else {
      await apporveBUSD();
      await donatefund(amountDonate);
    }

  }

  const Showdropdown = () => {

  }



  return (
    <div className="self-help-main">
      <div className="outerRow py-5 px-2 mb-3">
        <div className="row justify-content-xl-around justify-content-lg-between justify-content-center row-cols-auto mx-auto p-5" style={{ backgroundColor: "#1C1C1C", width: "90%", borderRadius: "10px", boxShadow: "10px 10px 4px #000" }}>
          <div className="col-lg-8">
            <p>
              want to take a break from betting? set a temporary restriction on
              your account using the custom selector below to pause betting on
              your profile, note once this is turned on you wont be able to make
              or create bets on betswamp for the selected period but you would be
              able to validate events and use other betswamp features.
            </p>
            {/* <input
              className="my-3 p-3 fw-bold shadow"
              type='datetime-local'
              style={{
                backgroundColor: "#3b3b3b",
                color: "#fff",
                width: "45%",
                outline: 'none',
                border: 'none'
              }}
              onChange={(e) => setPausingTime(e.target.value)}
              placeholder='SELECT DURATION'
            /> */}
            {/* <button className="btn my-3 p-3 dropdown-toggle" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: "#fff", color: "#000", width: "45%", borderRadius: "10px" }}>
              <span>SELECT DURATION</span>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Separated link</a></li>
              </ul>
            </button> */}
            <br />
            <button
              className="btn my-3 p-3 fw-bold justify-content-between d-flex"
              style={{ backgroundColor: "#fff", color: "#000", width: "45%", borderRadius: "10px" }}
              onClick={() => pause()}
            >
              <span>{ispaused ? "UNPAUSE BETTING" : "PAUSE BETTING"}</span>
              <MdOutlineArrowForwardIos className="mt-1" />
            </button>
          </div>
          <div className="col-lg-4">
            <CountdownCircleTimer
              isPlaying
              size={250}
              duration={pausetimeend - Math.round((new Date()).getTime() / 1000)}
              colors={["#006600", "#33cc33", "#ff9900", "#ff0000"]}
              colorsTime={[120, 75, 40, 0]}
              onComplete={() => [true, 1000]}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
        </div>
      </div>

      <div
        className="row secondRow py-5 justify-content-around px-2"
        style={{ borderBottomLeftRadius: "0" }}
      >
        <div className="col-lg-6 py-2 px-4">
          <h3>
            <BiDonateHeart /> DONATE
          </h3>
          <p>
            JOIN US AND BE PART OF THE SOLUTION TO GAMBLING ADDICTION, MAKE A SMALL DONATION TO OUR <span className="text-danger">PARTNERS</span> WORKING HARD TO HELP PEOPLE WITH ADDICTIONS.
          </p>
          <p>
            TOTAL DONATIONS : <span>$500</span>
          </p>
          <div className="amount">
            <p>CHOOSE DONATION AMOUNT</p>
            <button className="btn" onClick={() => setAmountDonate(5)}>$5</button>
            <button className="btn" onClick={() => setAmountDonate(25)}>$25</button>
            <button className="btn" onClick={() => setAmountDonate(50)}>$50</button>
            <button className="btn" onClick={() => setAmountDonate(100)}>$100</button>
            {/* <button className="btn" >OTHER</button> */}
          </div>
          <div className="customAmount mt-3">
            <span className="rounded border-end p-2 border-secondary">$</span>
            <input type="number" name="" id="" value={amountDonate} onChange={(e) => setAmountDonate(e.target.value)} />
            <span>BUSD</span>
          </div>
          <button
            className="btn my-3 p-3 fw-bold justify-content-between d-flex shadow"
            style={{
              backgroundColor: "#3b3b3b",
              color: "#fff",
              width: "45%",
            }}
            onClick={() => Donatethem()}
          >
            <span>DONATE</span>
            <MdOutlineArrowForwardIos className="mt-1" />
          </button>
        </div>
        <div className="col-lg-6 py-2 px-4 d-flex flex-column justify-content-between pb-4">
          <h3><FaTeamspeak /> SPEAK TO SOMEONE</h3>
          <p>Connect to a trained, compasionate listiner online who can  offer you free, confidential advice on gambling addiction. Whether you need advice for yourself or to support a friend or relative, we're here for you.</p>
          <button
            className="btn mt-auto p-3 fw-bold justify-content-between d-flex shadow"
            style={{
              backgroundColor: "#3b3b3b",
              color: "#fff",
              width: "45%",
            }}

          >
            <span>CONNECT NOW</span>
            <MdOutlineArrowForwardIos className="mt-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
