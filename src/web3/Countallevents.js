import React, { Component } from 'react'
import { totalEvents, getEvent,getActiveEvents, bettorscountspercent, AmountStackOnEventByaUser,bettorscounts } from './betsMVPService'
let newevents = 0

 export const TotalEventsCount = async() => {
         
          let check
          let check2
          let one
          let two 
          let zero
          let events = await totalEvents();
        
          let getevents = []
          for (let i = 0; i < events; i++) {
              check2 = await getEvent(i)
            if(events > 0){
              check = Object.create(check2)
              zero = await bettorscountspercent(check2[0],0,check2[15])
              one = await bettorscountspercent(check2[0],1,check2[15])
              two = await bettorscountspercent(check2[0],2,check2[15])
              let teamOneParticipate = await bettorscounts(check2[0],0)
              let teamtwoParticipate = await bettorscounts(check2[0],1)
              let stakeonevent = await AmountStackOnEventByaUser(check2[0])
              
              let totalpoolsize = check2[6] 
              let percentwinnings = (stakeonevent/totalpoolsize)*100
              let potentialwinnings = Number((((totalpoolsize-stakeonevent)/100)*percentwinnings)/10**18).toFixed(2)
                check.potential_wins = (Number(potentialwinnings) + Number(stakeonevent/10**18)).toFixed(2)
                check.id = check2[0]
                check.name = check2[3] 
                check.descript = check2[4]
                check.link = check2[5]
                check.validate = check2[12]
                check.poolsize = check2[6]
                check.starttime = check2[7]
                check.endtime = check2[8]
                check.teamone = check2[10]
                check.teamtwo = check2[11]
                check.subcategory = check2[2]
                check.Categories = check2[1]
                check.BettorsCount = check2[15]
                check.creator = check2[22]
                check.validationtime = check2[9]
                check.isboosted = check2[18]
                check.zero = zero
                check.one = one 
                check.two = two
                check.teamtwoParticipate = teamtwoParticipate
                check.teamOneParticipate = teamOneParticipate
            
                getevents.push(check)
                newevents = getevents
              
             window.localStorage.setItem('events',JSON.stringify(getevents))
            }
            }
          }

export const addingnewevents = async() => {
  let decodestoredevents = []
  let check2
  let check
  let one
  let two 
  let zero
  let activeEvents = await getActiveEvents();
  let newevent = await totalEvents();
  
  decodestoredevents = JSON.parse(window.localStorage.getItem('events'))
  
  if(newevent > decodestoredevents.length) {
              check2 = await getEvent(newevent-1)
              check = Object.create(check2)
              zero = await bettorscountspercent(check2[0],0,check2[14])
              one = await bettorscountspercent(check2[0],1,check2[14])
              two = await bettorscountspercent(check2[0],2,check2[14])
              let teamOneParticipate = await bettorscounts(check2[0],0)
              let teamtwoParticipate = await bettorscounts(check2[0],1)
              let stakeonevent = await AmountStackOnEventByaUser(check2[0])
              let totalpoolsize = check2[6] 
              let percentwinnings = (stakeonevent/totalpoolsize)*100
              let potentialwinnings = Number((((totalpoolsize-stakeonevent)/100)*percentwinnings)/10**18).toFixed(2)
            
                check.zero = zero
                check.one = one 
                check.two = two
                check.potential_wins = (Number(potentialwinnings) + Number(stakeonevent/10**18)).toFixed(2)
                check.id = check2[0]
                check.name = check2[3] 
                check.descript = check2[4]
                check.link = check2[5]
                check.validate = check2[12]
                check.poolsize = check2[6]
                check.starttime = check2[7]
                check.endtime = check2[8]
                check.teamone = check2[10]
                check.teamtwo = check2[11]
                check.subcategory = check2[2]
                check.Categories = check2[1]
                check.BettorsCount = check2[15]
                check.isboosted = check2[18]
                check.creator = check2[22]
                check.teamtwoParticipate = teamtwoParticipate
                check.teamOneParticipate = teamOneParticipate
                decodestoredevents.push(check)
                window.localStorage.setItem('events',JSON.stringify(decodestoredevents))
      }
}

export const updatingeventdata = async(id) => {
  let check2
  let check
  let one
  let two 
  let zero
  let decodestoredevents = JSON.parse(window.localStorage.getItem('events'))
  
  for(let i = 0; i < decodestoredevents.length; i++){
      if(Number(decodestoredevents[i].eventid) == id){
              check2 = await getEvent(i);
              check = Object.create(check2)
              zero = await bettorscountspercent(check2[0],0,check2[14])
              one = await bettorscountspercent(check2[0],1,check2[14])
              two = await bettorscountspercent(check2[0],2,check2[14])
              let teamOneParticipate = await bettorscounts(check2[0],0)
              let teamtwoParticipate = await bettorscounts(check2[0],1)
              let stakeonevent = await AmountStackOnEventByaUser(check2[0])
              let totalpoolsize = check2[6] 
              let percentwinnings = (stakeonevent/totalpoolsize)*100
              let potentialwinnings = Number((((totalpoolsize-stakeonevent)/100)*percentwinnings)/10**18).toFixed(2)
            
                check.zero = zero
                check.one = one 
                check.two = two
                check.potential_wins = (Number(potentialwinnings) + Number(stakeonevent/10**18)).toFixed(2)
                check.id = check2[0]
                check.name = check2[3] 
                check.descript = check2[4]
                check.link = check2[5]
                check.validate = check2[12]
                check.poolsize = check2[6]
                check.starttime = check2[7]
                check.endtime = check2[8]
                check.teamone = check2[10]
                check.teamtwo = check2[11]
                check.subcategory = check2[2]
                check.Categories = check2[1]
                check.BettorsCount = check2[15]
                check.isboosted = check2[18]
                check.creator = check2[22]
                check.teamtwoParticipate = teamtwoParticipate
                check.teamOneParticipate = teamOneParticipate
                decodestoredevents[i] = check
                window.localStorage.setItem('events',JSON.stringify(decodestoredevents))
              break; 
      }
              
    }
  }




