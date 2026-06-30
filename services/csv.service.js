const fs=require('fs');

const csv=require('csv-parser');
const readCsv=(filePath)=>{
return new Promise((resolve,reject)=>{
  const emails=[];
  
   fs.createReadStream(filePath).pipe(csv()).on("data", (row) => {
    emails.push(row.email);
    }).on("end", () => {
                resolve(emails);
                       }).on("error", (error) => {
                       reject(error);
                         });

    });
}


module.exports={readCsv};