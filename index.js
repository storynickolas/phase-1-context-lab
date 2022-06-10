// Your code here
function createEmployeeRecord(input) {
  return {
    firstName: input[0],
    familyName: input[1],
    title:  input[2],
    payPerHour: input[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employees) {
  let record = []
  employees.map(name => record.push(createEmployeeRecord(name)))
  return record
}

function createTimeInEvent(time) {
  const data = time.split(' ')
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(data[1]),
    date: data[0]
  })
  return this
}

function createTimeOutEvent(time) {
  let data = time.split(' ')
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(data[1]),
    date: data[0]
  })
  return this
}

function hoursWorkedOnDate(date) {
  let start = this.timeInEvents.find(value => value.date === date)
  let finish = this.timeOutEvents.find(value => value.date === date)
  return (finish.hour - start.hour)/100
}

function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date)*this.payPerHour
}

function findEmployeeByFirstName(emps, name) {
  let employee = emps.find(value => value.firstName === name)
  return employee
}

function testData(employees, start, out) {
  let staff = createEmployeeRecords(employees)
  start.forEach(el => {
    let employee = findEmployeeByFirstName(staff, el[0])
    el[1].forEach(entry => {
      createTimeInEvent.call(employee , entry)
    })
  })
  out.forEach(el => {
    let employee = findEmployeeByFirstName(staff, el[0])
    el[1].forEach(entry => {
      createTimeOutEvent.call(employee , entry)
    })
  })
  return staff
}


function calculatePayroll(staff) {

  let wages = []

  staff.forEach(el => {
    wages.push(allWagesFor.call(el))
  })
  return wages.reduce((previousValue, currentValue) => previousValue + currentValue)
}



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


