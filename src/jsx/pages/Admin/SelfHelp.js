import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { MdOutlineArrowForwardIos, MdArrowDropDown } from "react-icons/md";
import { BiDonateHeart } from "react-icons/bi";
import {FaTeamspeak} from 'react-icons/fa'

export default function SelfHelp() {
  const formatRemainingTime = (time) => {
    // const minutes = Math.floor((time % 3600) / 60);
    // const seconds = time % 60;

    // return `${minutes}:${seconds}`;
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
      return <div className="timer text-danger">Too late...</div>;
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

  return (
    <div className="self-help-main">
      <div className="row py-3 px-2 mb-3 justify-content-xl-around justify-content-lg-between justify-content-center row-cols-auto">
        <div className="col-md-8">
          <p>
            want to take a break from betting? set a temporary restriction on
            your account using the custom selector below to pause betting on
            your profile, note once this is turned on you wont be able to make
            or create bets on betswamp for the selected period but you would be
            able to validate events and use other betswamp features.
          </p>
          <button
            className="btn my-3 p-3 fw-bold justify-content-between d-flex shadow"
            style={{
              backgroundColor: "#3b3b3b",
              color: "#fff",
              width: "45%",
            }}
          >
            <span>SELECT DURATION</span>
            <MdArrowDropDown className="fs-5" />
          </button>
          <br />
          <button
            className="btn my-3 p-3 fw-bold justify-content-between d-flex"
            style={{ backgroundColor: "#fff", color: "#000", width: "45%" }}
          >
            <span>PAUSE BETTING</span>
            <MdOutlineArrowForwardIos className="mt-1" />
          </button>
        </div>
        <div className="col-md-4">
          <CountdownCircleTimer
            isPlaying
            size={300}
            duration={259200}
            colors={["#006600", "#33cc33", "#ff9900", "#ff0000"]}
            colorsTime={[120, 75, 40, 0]}
            onComplete={() => [true, 1000]}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
      </div>

      <div
        className="row py-3 px-3 px-xxl-5 px-sm-2 mb-3"
        style={{ borderBottomLeftRadius: "0" }}
      >
        <div className="col-lg-6">
          <h3>
            <BiDonateHeart /> DONATE
          </h3>
          <p>
            JOIN US AND BE PART OF THE SOLUTION TO GAMBLING ADDICTION, MAKE A
            SMALL DONATION TO OUR PARTNERS WORKING HARD TO HELP PEOPLE WITH
            ADDICTIONS.
          </p>
          <p>
            TOTAL DONATIONS : <span>$500</span>
          </p>
          <div className="amount">
            <p>CHOOSE DONATION AMOUNT</p>
            <button className="btn">$5</button>
            <button className="btn">$25</button>
            <button className="btn">$50</button>
            <button className="btn">$100</button>
            <button className="btn">OTHER</button>
          </div>
          <div className="customAmount">
            <input type="text" name="" id="" />
            <span>BUSD</span>
          </div>
          <button
            className="btn my-3 p-3 fw-bold justify-content-between d-flex shadow"
            style={{
              backgroundColor: "#3b3b3b",
              color: "#fff",
              width: "45%",
            }}
          >
            <span>DONATE</span>
            <MdOutlineArrowForwardIos className="mt-1" />
          </button>
        </div>
        <div className="col-lg-6">
            <h3><FaTeamspeak/> SPEAK TO SOMEONE</h3>
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
