const daysInMs = 86400000
const hourInMs = 3600000
const minInMs = 60000

function todayStartMs () {
  var curd = new Date()
  var curt = new Date(curd.getFullYear(), curd.getMonth(), curd.getDate())
  return curt.valueOf()
}
/* function msToYYYYMMDDHHMM (ms: number) {
  const d = new Date(ms)
  return d.getFullYear().toString() + '.' + (('0' + (d.getMonth() + 1).toString()).slice(-2)) + '.' +  (('0' + d.getDate().toString()).slice(-2)) + ' / ' +  (('0' + d.getHours().toString()).slice(-2)) + '.' +  (('0' + d.getMinutes().toString()).slice(-2))
} */
function msToYYYYMMDDHHMM (ms: number) {
  const d = new Date(ms)
  return (('000' + d.getFullYear().toString()).slice(-4)) + (('0' + (d.getMonth() + 1).toString()).slice(-2)) + (('0' + d.getDate().toString()).slice(-2)) + (('0' + d.getHours().toString()).slice(-2)) + (('0' + d.getMinutes().toString()).slice(-2))
}
function YYYYMMDDHHMMToMs (s: string) {
  const d = new Date()
  d.setFullYear(Number(s.substring(0,4)))
  d.setMonth(Number(s.substring(4,6))-1)
  d.setDate(Number(s.substring(6,8)))
  d.setHours(Number(s.substring(8,10)))
  d.setMinutes(Number(s.substring(10,12)))
  d.setSeconds(0)
  d.setMilliseconds(0)
  return d.valueOf()
}

/* function msToDDHHMM (ms: number) {
    // const d = new Date(ms)
    const DD = Math.floor(ms / daysInMs)
    const HH = Math.floor((ms % daysInMs) / hourInMs)
    const MM = (ms % daysInMs) % hourInMs
    return (('000' + DD.toString()).slice(-3)) + '/' +  (('0' + HH.toString()).slice(-2)) + '/' +  (('0' + MM.toString()).slice(-2))
} */
 function msToDDDHHMM (ms: number) {
  // const d = new Date(ms)
  const DD = Math.floor(ms / daysInMs)
  const HH = Math.floor((ms % daysInMs) / hourInMs)
  const MM = Math.floor(((ms % daysInMs) % hourInMs) / minInMs)
  return (('000' + DD.toString()).slice(-3)) +  (('00' + HH.toString()).slice(-2)) +  (('00' + MM.toString()).slice(-2))
} 
  
  
  function DDHHMMToMs (s: string) {
    const ms = daysInMs * Number(s.substring(0,2)) + hourInMs * Number(s.substring(2,2)) + minInMs * Number(s.substring(4,2))
    return ms
  }
  function DDDHHMMToMs (s: string) {
    const ms = daysInMs * Number(s.substring(0,3)) + hourInMs * Number(s.substring(3,5)) + minInMs * Number(s.substring(5,7))
    return ms
  }
  
  function setMsToTime (ms: number, typeTime: string) : string {
        // console.log(msToDDHHMM(ms))
        return (typeTime === 'Time') ? msToYYYYMMDDHHMM(ms) : (typeTime === 'int') ? msToDDDHHMM(Date.now() - ms) : msToYYYYMMDDHHMM(todayStartMs() - 3* hourInMs)
        
      }
  // changeTime: 010/12/12, time: 0101212
  function convChangeTimeToTime (ct: string, tt: 'time' | 'int' | 'prev_close') {
    let convCt = (tt === 'int') ? ct.substring(0, 3) +  ct.substring(4, 6) + ct.substring(7, 9) : ct.substring(0, 4) + ct.substring(5, 7) + ct.substring(8, 10) + ct.substring(11, 13) + ct.substring(14, 16)
    return convCt
  }

  function convTimeToChangeTime (t: string, tt: 'time' | 'int' | 'prev_close') {
    let convCt = (tt === 'int') ? t.substring(0, 3) + '/' + t.substring(3, 5) + '/' + t.substring(5, 7) : t.substring(0, 4) + '.' + t.substring(4, 6) + '.' + t.substring(6, 8) + '/' + t.substring(8, 10) + '.' +  t.substring(10, 12)
    return convCt
  }
  
  export { todayStartMs, msToDDDHHMM, msToYYYYMMDDHHMM, YYYYMMDDHHMMToMs, DDDHHMMToMs, DDHHMMToMs, setMsToTime, convChangeTimeToTime, convTimeToChangeTime as Calc}