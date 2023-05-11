import express from 'express';
import fetch from 'node-fetch';
import axios from 'axios';
import redis from 'ioredis';


const redisClient = redis.createClient();

   



const app = express()

const myfunction= async()=>{

  const options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/actors/get-awards',
    params: {
      nconst: 'nm0001667'
    },
    headers: {
      'X-RapidAPI-Key': '0c9e9b251emshf18fb81b9004ddap1849adjsn11cc3eaa1fbd',
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
  };


    const response = await axios.request(options);
    await redisClient.set('actorsawards',JSON.stringify(response.data))
    const data = await redisClient.get('actorsawards')
    if(!data) throw Error('data from redis is null')
    const cachedData = JSON.parse(data)
    // filter function
    const filtered = cachedData?.resource?.awards.filter(( value:any) => value.year === 2005 )
    console.log(filtered)

    //  map function
 const mapping = cachedData?.resource?.awards.map(( value:any) => value.year === 2005 )
    
    console.log(mapping)
      // find function
    const finding = cachedData?.resource?.awards.find(( value:any) => value.awardName === 'Satellite Award' )

    console.log (finding)
    // reduce function
    const reducing = cachedData?.resource?.awards.reduce(( value:any) => value.awardName === 'Satellite Award' )

    console.log (reducing)
    const sorting = cachedData?.resource?.awards.sort(( value:any) => value.eventName === 'Golden Globes, USA' )

    console.log (sorting)
    
    redisClient.end()
   
    
//     const string = ["rhys meyers","ride with the devil","steerpike","1997"]
//   const filter = string.filter(value =>{
//     console.log(value);
//   })
//  const text = "RhysMeyers";
//     const length = text.length;
//     console.log(text.length);
//     var name = "miniBios";
 
// var newName = Array.prototype.map.call(name, function(item) {
//     return item + 'd';
// })
//  console.log(newName)
//  const years=[1997,1998,1999,2000];
// years.reduce(function (previousVal, currentVal) {
//   console.log("previousVal", previousVal);
//   console.log("currentval", currentVal);
//    return previousVal + currentVal;
// })
}

myfunction()
