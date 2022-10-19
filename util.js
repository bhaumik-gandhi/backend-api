const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const getCSVData = () => {
  const data = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve(__dirname, 'data', 'crime_record.csv'), {
      encoding: 'utf-8',
    })
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => reject(error))
      .on('data', (row) => data.push(row))
      .on('end', () => {
        resolve(data);
      });
  });
};

module.exports = { getCSVData };
