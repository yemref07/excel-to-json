const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('1.xlsx');
const worksheet = workbook.Sheets['RC Türkçe'];
const data = XLSX.utils.sheet_to_json(worksheet);

const result = {};

data.forEach((row) => {
    const keys = row.Key.split('.');
    let currentLevel = result;

    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            currentLevel[key] = row.Value;
        } else {
            if (!currentLevel[key]) {
                currentLevel[key] = {};
            }
            currentLevel = currentLevel[key];
        }
    });
});

console.log(result);
// Convert the JavaScript object to a JSON string
const jsonResult = JSON.stringify(result, null, 2); // null and 2 for pretty formatting

// Write the JSON string to a text file
fs.writeFileSync('output.json', jsonResult);

console.log('Data written to output.json');
//note pad dosyasına yazdır result objesini , kontrol etmek için
