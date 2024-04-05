// Your code here
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}
function createEmployeeRecords(arrays) {
    
    let employeeRecords = [];
     
    arrays.forEach(employeeData => {
         
        employeeRecords.push(createEmployeeRecord(employeeData))
    });
    
    
    
    
    return employeeRecords;
}
function createTimeInEvent(employeeRecord, records) {
    let [date, hour] = records.split(' ');
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour)
    });
    return employeeRecord;
}

    function createTimeOutEvent(employeeRecord, records) {
        let [date, hour] = records.split(' ');
        employeeRecord.timeOutEvents.push({
            type: "TimeOut",
            date: date,
            hour: parseInt(hour)
        });
        return employeeRecord;
    }
    function hoursWorkedOnDate(employeeRecord, date) {
        
        const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
        const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
    
       
        const timeInHour = parseInt(timeIn.hour.toString().slice(0, -2));
        const timeOutHour = parseInt(timeOut.hour.toString().slice(0, -2));
    

        const hoursWorked = timeOutHour - timeInHour;
    
        return hoursWorked;
    }
    function wagesEarnedOnDate(employeeRecord, date) {
        const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
        const payRate = employeeRecord.payPerHour;
        
        return hoursWorked * payRate;
    }
    function allWagesFor(employeeRecord) {
        const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    
        let totalWages = 0;
        for (let date of datesWorked) {
            totalWages += wagesEarnedOnDate(employeeRecord, date);
        }
    
        return totalWages;
    }
    function calculatePayroll(employeeRecords) {
        let totalPayroll = 0;
        
        for (let employeeRecord of employeeRecords) {
            totalPayroll += allWagesFor(employeeRecord);
        }
    
        return totalPayroll;
    }
    
