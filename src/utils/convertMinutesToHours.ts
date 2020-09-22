export default function convertMinutesToHours(time: number | any){ 
  
  let hours = Math.floor(time / 60).toString()
  let minutes = (time % 60).toString()
  
  hours = Number(hours) < 10 ? hours = `0${hours}` : hours
  minutes = Number(minutes) < 10 ? minutes = `0${minutes}` : minutes

  return `${hours}:${minutes}`
}

