// Your code here
function createEmployeeRecord(array) {
    const employeeRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}

function createEmployeeRecords(array) {
   let arrayOfObj = []
   array.forEach(arr => {
       arrayOfObj.push(createEmployeeRecord(arr))
   })
   return arrayOfObj
}

function createTimeInEvent(record, date) {
    let dateArray = date.split(' ')
    const timeIn = {
        type: "TimeIn",
        hour: parseInt(dateArray[1]),
        date: dateArray[0]
    }
   let updatedRecord = record.timeInEvents.push(timeIn)
   return record 
}

function createTimeOutEvent(record, date) {
    let dateArray = date.split(' ')
    const timeOut = {
        type: "TimeOut",
        hour: parseInt(dateArray[1]),
        date: dateArray[0]
    }
   let updatedRecord = record.timeOutEvents.push(timeOut)
   return record 
}

function hoursWorkedOnDate(record, date) {
    let timeInDate = []
    let timeOutDate = []
    record.timeInEvents.forEach(timeIn => {
        if(timeIn.date === date) {
            timeInDate.push(timeIn)
        }
    })
    record.timeOutEvents.forEach(timeOut => {
        if(timeOut.date === date) {
            timeOutDate.push(timeOut)
        }
    })
    let startHour = timeInDate[0].hour 
    let endHour = timeOutDate[0].hour 
    return (endHour - startHour) / 100  
}

function wagesEarnedOnDate(record, date) {
    const payRate = record.payPerHour
    return hoursWorkedOnDate(record, date) * payRate 
}

function allWagesFor(record) {
    let dates = record.timeInEvents.map(function (time) {
        return time.date 
    })
    let pay = dates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(record, d)
    }, 0)
    return pay 
}

function findEmployeeByFirstName(records, firstName) {
  let matchingRecord = records.reduce(record => {
       if(record.firstName === firstName){
           return record 
       } 
    })
    return matchingRecord
}

function calculatePayroll(records) {
  let eachEmployeeTotal = records.map(record => {
    let dates = record.timeInEvents.map(function (time) {
        return time.date 
    })
    let pay = dates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(record, d)
    }, 0)
    return pay 
   })
   let calculatedTotal = eachEmployeeTotal.reduce(function (memo, recordTotal){
       return memo + recordTotal
   }, 0)
   return calculatedTotal
}