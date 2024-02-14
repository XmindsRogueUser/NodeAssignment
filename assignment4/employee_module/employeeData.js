const employeeData = [
    {
        id: 1,
        firstName: "Davaraj",
        lastName: "PD",
        age: "18",
    },
    {
        id: 2,
        firstName: "Shivaraj",
        lastName: "T",
        age: "17",
    }
];

let findById = (id) => {
    let data = employeeData.filter(obj => {
        return obj.id == id
    })
    if (data.length > 0) {
        return data[0];
    }
    return null;
}

module.exports = { employeeData, findById };

