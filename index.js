/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import fs from "fs";
import inquirer from "inquirer";
import qr from "qr-image";

let userUrl ;

inquirer.prompt([
    {
        type: "input",
        name:"url",
        message:"Enter a URL",
    },
])
.then((answers) => {   
 userUrl = answers.url ;   
 fs.writeFile("URL.txt",answers.url,err => {
  if (err) {
    console.error(err);
  } else {
    console.log("success!");
    fs.readFile("URL.txt","utf8",(err, data) => {
    if (err){
        console.error(err);
    }else{
        console.log("File contents",data);
    }
});
const qr_png = qr.image(answers.url, { type: "png" });
qr_png.pipe(fs.createWriteStream("qr-image.png"));
console.log("QR code image saved as qr-image.png");
}
}
); 
});


