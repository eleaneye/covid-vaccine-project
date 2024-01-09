const xml2js = require('xml2js');
const fs = require('fs');
const util = require('util');

// const xml = fs.readFileSync('D76_Example1-resp.xml', 'utf8');
// const options = {
//     mergeAttrs: true,
//     trim: true,
//     normalize: true,
// };

var jsonString = fs.readFileSync('user.json', 'utf-8');
var jsonData = JSON.parse(jsonString);

console.log(typeof jsonData);
var jsonArray = [];
jsonData.forEach(event => {
    // console.log(util.inspect(event, false, null));
    if (event.c[0].l) {
        var symptom = event.c[0].l[0];
    }
    if (event.c[1].l) {
        var vaers_id = event.c[1].l[0]
    }
    if (event.c[2].l) {
        var age = event.c[2].l[0]
    }
    if (event.c[3].l) {
        var vaccine = event.c[3].l[0]
    }
    if (event.c[4].l) {
        var sex = event.c[4].l[0]
    }
    if (event.c[5].tx) {
        var description = event.c[5].tx
    }
    const jsonObject = {
        symptom: symptom,
        vaers_id: vaers_id,
        age: age,
        vaccine: vaccine,
        sex: sex,
        description: description
    };

    jsonArray.push(jsonObject);
})
console.log(jsonArray);

