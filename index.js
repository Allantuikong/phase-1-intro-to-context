// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arrays) {
    return arrays.map(array => createEmployeeRecord(array));
}

function createTimeInEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    });

    return employee;
}

function createTimeOutEvent(employee, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    });

    return employee;
}

function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);

    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const wagesEarned = hoursWorked * employee.payPerHour;
    return wagesEarned;
}

function allWagesFor(employee) {
    const wagesForDates = employee.timeInEvents.map(event => {
        const date = event.date;
        return wagesEarnedOnDate(employee, date);
    });
    const totalWages = wagesForDates.reduce((acc, curr) => acc + curr, 0);
    return totalWages;
}

function calculatePayroll(employees) {
    const totalPayroll = employees.reduce((acc, employee) => acc + allWagesFor(employee), 0);
    return totalPayroll;
}
