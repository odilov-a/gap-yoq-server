const { exec } = require("child_process");

const databaseName = process.env.DATABASE_NAME;
const backupDirectory = "./";

const backupCommand = `mongodump --db ${databaseName} --out ${backupDirectory}`;

exports.getBackup = () => {
exec(backupCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Backup failed: ${error.message}`);
    } else {
        console.log(`Backup successful:\n${stdout}`);
    }
});
};

// const { exec } = require('child_process');
// const fs = require('fs');
// const axios = require('axios');

// const databaseName = 'instagram';
// const backupDirectory = './';
// const backupFileName = `${databaseName}_backup_${new Date().toISOString()}.tar.gz`;

// const backupCommand = `mongodump --db ${databaseName} --out ${backupDirectory}`;

// exec(backupCommand, (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Backup failed: ${error.message}`);
//     } else {
//         console.log(`Backup successful:\n${stdout}`);

//         const backupFilePath = `${backupDirectory}${databaseName}`;
//         const backupFile = fs.createReadStream(backupFilePath);

//         const uploadUrl = 'https://api.hypernova.uz/upload';

//         const formData = new FormData();
//         formData.append('file', backupFile);

//         axios.post(uploadUrl, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         })
//         .then(response => {
//             console.log('File upload successful');
//             console.log('Response:', response.data);
//         })
//         .catch(error => {
//             console.error('File upload failed:', error.message);
//         });
//     }
// });
