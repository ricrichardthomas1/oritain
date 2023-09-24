/*
Below code achieves the purpose of reading an Excel workbook housing a single worksheet with data and segregating it's rows into 2 separate worksheets on the same file based on whether the rows have missing data or not.
The code can be enhanced further for iterating through files with greater number of sheets by defining it as a function call that can be called iteratively over each sheets.
The fs npm package can optionally be used to enhance the process reading from and writing from multiple files iteratively if required.
*/

// first install the xlsx npm package to deal with ecxel files
//import xlsx using the 'require' function call

const moment = require("moment");
const XLSX = require("xlsx");

// load the data into a workbook object, cell Dates option can be set to true to retain Dates as Date values
var workbook1 = XLSX.readFile("Data.xlsx",{cellDates:true});

// store the worksheet names in a variable(optional), but helpful step if the code has to be adapted for workbooks with multiple sheets which need to be interated
const sNames = workbook1.SheetNames;

// store the first sheet in a variable, store the data headers in another
const sheet = workbook1.Sheets[sNames[0]];
const hdata = XLSX.utils.sheet_to_json(sheet, {header:1}).shift();

// store the datarange in an array of arrays object
const dataaoa = XLSX.utils.sheet_to_json(sheet, {header:1});

// initialize empty arrays and push the header name array to them
var ws1 = [];
ws1.push(hdata);
var ws2 = [];
ws2.push(hdata);


// run a loop to iterate over each cell in each row and check if it's empty, push the rows to corresponding arrays (storing complete vs. incomplete rows)
for (let i=1; i<dataaoa.length;i++){
    var array_r = dataaoa[i]
    var null_detect = false
    for (let r=0; r<array_r.length;r++){
        if (array_r[r] == null || array_r[r] == undefined){
            if (null_detect == false){
                null_detect = true;
            }
            array_r[r] = "N/A";
        }
        if (r == 7){
            if (moment.isDate(array_r[r]) == false){
                array_r[r] = moment(array_r[r]).toDate();
            } 
            if (null_detect == true){
                ws1.push(array_r);
            }
            else {
                ws2.push(array_r);
            }
        }  
    }
}


// convert the aoa objects to sheet objects
ws1 = XLSX.utils.aoa_to_sheet(ws1);
ws2 = XLSX.utils.aoa_to_sheet(ws2);

// append the sheets to the workbook
XLSX.utils.book_append_sheet(workbook1, ws2, "Gold_Customers");
XLSX.utils.book_append_sheet(workbook1, ws1, "Bronze_Customers");

// write back the workbook to the original file
XLSX.writeFile(workbook1, "Data.xlsx");
