import React,{useEffect, useState} from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { getTotalValidatorRewardEarned, getvalidatorsRewardOnEvnet,getusertotalwinnings, AmountStackOnEventByaUser, userBethistory,claimrewards,validateEvent, getvalidatorHistory, getValidationPoint, pendingpoint,claimpoints } from "../../../web3/betsMVPService";
import { getBETSV2Balance } from './../../../web3/betsService'
import toast, { Toaster } from "react-hot-toast";
const tost = () =>
  toast.success("Success.", {
    style: {
      padding: "16px",
      color: "#000",
    },
    iconTheme: {
      primary: "#0b0b0b",
      secondary: "#ffffff",
    },
  });

export default function ValidateEvents() {
    const [allvalidatevents, setAllValidateEvent] = useState([])
    const [allnonevnets, setAllnonevents] = useState([])
    const [totalwon, setTotalWon] = useState(0)
    const [skip, setSkip] = useState(0)
    const [totaluserbetlost, setTotalUserBetLost] = useState(0)
    const [validatorReward, setValidatorReward] = useState(0)
    const [occur, setoccur] = useState(0)
    const [checkbox, setCheckBox] = useState(false)
    const [sbets, setSbets] = useState(0)
    const [uservalidationpoints, setUserValidationPoints] = useState(0)
    const [pendingpoints, setPendingPoints] = useState(0)
    

    useEffect(()=>{
      const init=async()=>{
        let stake = 0
      const totalwon = await getusertotalwinnings();
      setTotalWon(totalwon/10**18)
      const reward = await getTotalValidatorRewardEarned()
      console.log("reward",reward)
      setValidatorReward(reward)
      const sbets = await getBETSV2Balance();
      const uservalidpoints = await getValidationPoint()
      setUserValidationPoints(uservalidpoints)
      setSbets(sbets)
      setInterval(async()=>{
        const points = await pendingpoint()
        setPendingPoints(points)
      },5000)
      const validatorhstry = await getvalidatorHistory()
      const userbethty = await userBethistory()

      userbethty.forEach(async (ele) =>{
        const amountstake = await AmountStackOnEventByaUser(ele)
        stake = Number(amountstake) + stake
        setTotalUserBetLost(stake/10**18)
      })
      const decodestoredevents = JSON.parse(window.localStorage.getItem('events'))
      const nonvalidated = []
      const evnets = []

      for(let i = 0; i<decodestoredevents.length; i++){
        if(validatorhstry.includes(decodestoredevents[i].id) && decodestoredevents[i].validate){
          const data = decodestoredevents[i]
          data.reward = await getvalidatorsRewardOnEvnet(data.id)
          evnets.push(data)
        }
      }
     
      
      decodestoredevents.forEach(element => {
        if(!element.validate && element.endtime < Math.round((new Date()).getTime() / 1000) && Math.round((new Date()).getTime() / 1000) < element.validationtime){
          nonvalidated.push(element)
        }
      });
      
      setAllnonevents(nonvalidated)
      setAllValidateEvent(evnets)
      }

      init();
    },[])


  const formatRemainingTime = (time) => {
    const day = Math.floor(time / (3600 * 24));
    const hours = Math.floor((time % (3600 * 24)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${day}day  ${hours}:${minutes}:${seconds}`;
  };

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer text-danger">Too late...</div>;
    }

    return (
      <div className="timer text-light text-center">
        <div className="text">Remaining time</div>
        <div className="value">{formatRemainingTime(remainingTime)}</div>
      </div>
    );
  };

  // FAKE CARDS
  const fakeCards = [
    {
      hashtags: "#SOCCER",
      title: "Chealsea  vs  Machester City",
      starts: "20 DEC 2020",
      ends: "20 DEC 2021",
      pool: "$1,600",
      reward: "$3",
    },
    {
      hashtags: "#SOCCER",
      title: "Chealsea  vs  Machester City",
      starts: "20 DEC 2020",
      ends: "20 DEC 2021",
      pool: "$1,600",
      reward: "$30",
    },
    {
      hashtags: "#SOCCER",
      title: "Chealsea  vs  Machester City",
      starts: "20 DEC 2020",
      pool: "$1,600",
      reward: "$30",
    },
  ];

  const getdays = (time) => {
    return new Date(time*1000).toLocaleString();
  }

  const renderFake = (fakeCards, index) => {
    return (
      <div
        className="card my-4"
        key={index}
        style={{ backgroundColor: "#1c1c1c" }}
      >
        <div className="card-head p-3">
          <p>{fakeCards.subcategory}</p>
          <h5 className="card-title">{fakeCards.teamone} vs {fakeCards.teamtwo}</h5>
          <span>{getdays(fakeCards.endtime)}</span>
        </div>
        <div className="card-body">
          <div>
            <p>STATISTICS</p>
            <ul className="p-0">
              <li>{fakeCards.zero}% {fakeCards.teamone}</li>
              <li>{fakeCards.one}% {fakeCards.teamtwo}</li>
              <li>{fakeCards.two}% DRAW</li>
            </ul>
          </div>
          <p className="mt-3">POOL SIZE</p>
          <span>{fakeCards.poolsize/10**18}</span>
          <p className="mt-3">REWARDS</p>
          <span>${fakeCards.reward/10**18}</span>
          {Number(fakeCards.reward) <= 0 ? <button className="btn" onClick={()=>claimReward(fakeCards.id)}>CLAIM</button>: ''}
        </div>
      </div>
    );
  };

  const slipEvents =()=>{
   if(skip == allnonevnets.length-1){
     setSkip(0)
   }
   else{
    setSkip(skip+1)
   }
  }
  
  const claimReward =async(id)=>{
    await claimrewards(id);
  }
  const validateEvenet=async(id)=>{
    await validateEvent(id, occur)
  }

  const claimValidationPonits =async()=>{
    const data = await claimpoints();
    if (data.status) {
      tost();
    }
  }
  
  return (
    <div className="validate-event-main">
      {/* CARD STAT */}
      <div className="row py-3 px-2 mb-3 justify-content-xl-around justify-content-lg-between justify-content-center row-cols-auto">
        <div
          className="col px-3 py-2 TS rounded my-3 mx-1 col-r"
        >
          <span>TOTAL</span>
          <h5>EVENTS VALIDATED</h5>
          <hr style={{ color: "#FF4003" }} />
          <p>{allvalidatevents.length}</p>
        </div>
        <div className="col px-3 py-2 TS rounded my-3 mx-1 col-b">
          <span>TOTAL</span>
          <h5>REWARDS EARNED</h5>
          <hr className="text-primary" />
          <p>{validatorReward/10**18}</p>
        </div>
        <div
          className="col px-3 py-2 TS rounded my-3 mx-1 col-p"
        >
          <span>TOTAL</span>
          <h5>VALIDATION POINTS</h5>
          <hr className="text-danger" />
          <p>{uservalidationpoints}</p>
        </div>
        {/* <div
          className="col px-3 py-2 TS rounded my-3 mx-1 col-y"
        >
          <span>TOTAL</span>
          <h5>sBETS</h5>
          <hr className="text-warning" />
          <p>{sbets}</p>
        </div> */}
        <div
          className="col px-3 py-2 TS rounded my-3 mx-1 col-g"
        >
          <span>PENDING</span>
          <h5>VALIDATION POINTS</h5>
          <hr className="text-success" />
          <p>{pendingpoints}</p>
          <button className="btn btn-success ms-auto d-block text-black fw-bold" onClick={()=>claimValidationPonits()} disabled={pendingpoints <= 0 ? 'disabled' : '' }>CLAIM</button>
        </div>
        
      </div>

      {/* TIMER & TERMS */}
      {allnonevnets && allnonevnets.length > 0 ?  <div
        className="row py-3 px-3 px-xxl-5 px-sm-2 mb-3 terms"
        style={{ borderBottomLeftRadius: "0" }}
      >
        <div
          className="row mx-auto px-2 py-4"
          style={{
            backgroundColor: "#1C1C1C",
            width: "90%",
            borderRadius: "10px",
          }}
        >
          <div className="col-lg-5">
            <CountdownCircleTimer
              isPlaying
              size={300}
              duration={Number(allnonevnets[skip].validationtime) - Math.round((new Date()).getTime() / 1000)}
              colors={["#006600", "#33cc33", "#ff9900", "#ff0000"]}
              colorsTime={[120, 75, 40, 0]}
              onComplete={() => [true, 1000]}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
          <div className="col-lg-6">
            <div className="container py-3 mb-2 rounded">
              <h5>EVENT</h5>
              <p>{allnonevnets[skip].teamone} VS {allnonevnets[skip].teamtwo}</p>
              <br />
              <h5>LINK</h5>
              <a href={allnonevnets[skip].link}>{allnonevnets[skip].link}</a>
              <br />
              <br />
              <h5>PREFFERED ODD</h5>
              <input type="radio" name="team" id="odd1" value='0' onChange={(e)=>setoccur(e.target.value)}/>
              &nbsp;&nbsp;&nbsp;
              <label htmlFor="odd1">{allnonevnets[skip].teamone}</label>
              <br />
              <input type="radio" name="team" id="odd2" value='1' onChange={(e)=>setoccur(e.target.value)}/>
              &nbsp;&nbsp;&nbsp;
              <label htmlFor="odd2">{allnonevnets[skip].teamtwo}</label>
              <br />
              <input type="radio" name="team" id="odd3" value='2'  onChange={(e)=>setoccur(e.target.value)}/>
              &nbsp;&nbsp;&nbsp;
              <label htmlFor="odd3">DRAW</label>
            </div>
            <div className="d-flex">
              <input type="checkbox" id="acceptTerm" value={checkbox} onClick={()=>setCheckBox(!checkbox)} />
              &nbsp;&nbsp;
              <label htmlFor="acceptTerm">
                I verify my selection on this event is accurate and in line with
                the actual outcome of the event
              </label>
            </div>
            <div className="d-flex justify-content-evenly">
              <button
                className={`btn my-3 p-3 fw-bold justify-content-between d-flex ${checkbox ? `` : `disabled`}`}
                style={{ backgroundColor: "#fff", color: "#000", width: "45%" }}
                onClick={()=>validateEvenet(allnonevnets[skip].id)}
              >
                <span>VALIDATE</span>
                <MdOutlineArrowForwardIos className="mt-1" />
              </button>
              <button
                className="btn my-3 p-3 fw-bold justify-content-between d-flex shadow"
                style={{
                  backgroundColor: "#3b3b3b",
                  color: "#fff",
                  width: "45%",
                }}
                onClick={()=>slipEvents()}
              >
                <span>SKIP</span>
                <MdOutlineArrowForwardIos className="mt-1" />
              </button>
            </div>
          </div>


        </div>
      </div>:''}

      {/* VALIDATE CARDS */}
      <div className="validCards container-fluid">
      {allvalidatevents.map((data)=>renderFake(data))}
      <Toaster/>
      </div>
    </div>
  );
}
