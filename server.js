const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/users/", require("./routes/usersRoute"));
app.use(express.static(path.resolve(__dirname, '../client/build')));

function getState(zipString) {

    /* Ensure param is a string to prevent unpredictable parsing results */
    if (typeof zipString !== 'string') {
        console.error('Must pass the zipcode as a string.');
        return;
    }
  
    /* Ensure we have exactly 5 characters to parse */
    if (zipString.length !== 5) {
        console.error('Must pass a 5-digit zipcode.');
        return;
    }
  
    /* Ensure we don't parse strings starting with 0 as octal values */
    const zipcode = parseInt(zipString, 10);
  
    let st;
    let state;
  
    /* Code cases alphabetized by state */
    if (zipcode >= 35000 && zipcode <= 36999) {
        st = 'AL';
        state = 'Alabama';
    } else if (zipcode >= 99500 && zipcode <= 99999) {
        st = 'AK';
        state = 'Alaska';
    } else if (zipcode >= 85000 && zipcode <= 86999) {
        st = 'AZ';
        state = 'Arizona';
    } else if (zipcode >= 71600 && zipcode <= 72999) {
        st = 'AR';
        state = 'Arkansas';
    } else if (zipcode >= 90000 && zipcode <= 96699) {
        st = 'CA';
        state = 'California';
    } else if (zipcode >= 80000 && zipcode <= 81999) {
        st = 'CO';
        state = 'Colorado';
    } else if ((zipcode >= 6000 && zipcode <= 6389) || (zipcode >= 6391 && zipcode <= 6999)) {
        st = 'CT';
        state = 'Connecticut';
    } else if (zipcode >= 19700 && zipcode <= 19999) {
        st = 'DE';
        state = 'Delaware';
    } else if (zipcode >= 32000 && zipcode <= 34999) {
        st = 'FL';
        state = 'Florida';
    } else if ( (zipcode >= 30000 && zipcode <= 31999) || (zipcode >= 39800 && zipcode <= 39999) ) {
        st = 'GA';
        state = 'Georgia_(U.S._state)';
    } else if (zipcode >= 96700 && zipcode <= 96999) {
        st = 'HI';
        state = 'Hawaii';
    } else if (zipcode >= 83200 && zipcode <= 83999 && zipcode != 83414) {
        st = 'ID';
        state = 'Idaho';
    } else if (zipcode >= 60000 && zipcode <= 62999) {
        st = 'IL';
        state = 'Illinois';
    } else if (zipcode >= 46000 && zipcode <= 47999) {
        st = 'IN';
        state = 'Indiana';
    } else if (zipcode >= 50000 && zipcode <= 52999) {
        st = 'IA';
        state = 'Iowa';
    } else if (zipcode >= 66000 && zipcode <= 67999) {
        st = 'KS';
        state = 'Kansas';
    } else if (zipcode >= 40000 && zipcode <= 42999) {
        st = 'KY';
        state = 'Kentucky';
    } else if (zipcode >= 70000 && zipcode <= 71599) {
        st = 'LA';
        state = 'Louisiana';
    } else if (zipcode >= 3900 && zipcode <= 4999) {
        st = 'ME';
        state = 'Maine';
    } else if (zipcode >= 20600 && zipcode <= 21999) {
        st = 'MD';
        state = 'Maryland';
    } else if ( (zipcode >= 1000 && zipcode <= 2799) || (zipcode == 5501) || (zipcode == 5544 ) ) {
        st = 'MA';
        state = 'Massachusetts';
    } else if (zipcode >= 48000 && zipcode <= 49999) {
        st = 'MI';
        state = 'Michigan';
    } else if (zipcode >= 55000 && zipcode <= 56899) {
        st = 'MN';
        state = 'Minnesota';
    } else if (zipcode >= 38600 && zipcode <= 39999) {
        st = 'MS';
        state = 'Mississippi';
    } else if (zipcode >= 63000 && zipcode <= 65999) {
        st = 'MO';
        state = 'Missouri';
    } else if (zipcode >= 59000 && zipcode <= 59999) {
        st = 'MT';
        state = 'Montana';
    } else if (zipcode >= 27000 && zipcode <= 28999) {
        st = 'NC';
        state = 'North_Carolina';
    } else if (zipcode >= 58000 && zipcode <= 58999) {
        st = 'ND';
        state = 'North_Dakota';
    } else if (zipcode >= 68000 && zipcode <= 69999) {
        st = 'NE';
        state = 'Nebraska';
    } else if (zipcode >= 88900 && zipcode <= 89999) {
        st = 'NV';
        state = 'Nevada';
    } else if (zipcode >= 3000 && zipcode <= 3899) {
        st = 'NH';
        state = 'New_Hampshire';
    } else if (zipcode >= 7000 && zipcode <= 8999) {
        st = 'NJ';
        state = 'New_Jersey';
    } else if (zipcode >= 87000 && zipcode <= 88499) {
        st = 'NM';
        state = 'New_Mexico';
    } else if ( (zipcode >= 10000 && zipcode <= 14999) || (zipcode == 6390) || (zipcode == 501) || (zipcode == 544) ) {
        st = 'NY';
        state = 'New_York';
    } else if (zipcode >= 43000 && zipcode <= 45999) {
        st = 'OH';
        state = 'Ohio';
    } else if ((zipcode >= 73000 && zipcode <= 73199) || (zipcode >= 73400 && zipcode <= 74999) ) {
        st = 'OK';
        state = 'Oklahoma';
    } else if (zipcode >= 97000 && zipcode <= 97999) {
        st = 'OR';
        state = 'Oregon';
    } else if (zipcode >= 15000 && zipcode <= 19699) {
        st = 'PA';
        state = 'Pennsylvania';
    } else if (zipcode >= 300 && zipcode <= 999) {
        st = 'PR';
        state = 'Puerto_Rico';
    } else if (zipcode >= 2800 && zipcode <= 2999) {
        st = 'RI';
        state = 'Rhode_Island';
    } else if (zipcode >= 29000 && zipcode <= 29999) {
        st = 'SC';
        state = 'South_Carolina';
    } else if (zipcode >= 57000 && zipcode <= 57999) {
        st = 'SD';
        state = 'South_Dakota';
    } else if (zipcode >= 37000 && zipcode <= 38599) {
        st = 'TN';
        state = 'Tennessee';
    } else if ( (zipcode >= 75000 && zipcode <= 79999) || (zipcode >= 73301 && zipcode <= 73399) ||  (zipcode >= 88500 && zipcode <= 88599) ) {
        st = 'TX';
        state = 'Texas';
    } else if (zipcode >= 84000 && zipcode <= 84999) {
        st = 'UT';
        state = 'Utah';
    } else if (zipcode >= 5000 && zipcode <= 5999) {
        st = 'VT';
        state = 'Vermont';
    } else if ( (zipcode >= 20100 && zipcode <= 20199) || (zipcode >= 22000 && zipcode <= 24699) || (zipcode == 20598) ) {
        st = 'VA';
        state = 'Virginia';
    } else if ( (zipcode >= 20000 && zipcode <= 20099) || (zipcode >= 20200 && zipcode <= 20599) || (zipcode >= 56900 && zipcode <= 56999) ) {
        st = 'DC';
        state = 'Washington,_D.C.';
    } else if (zipcode >= 98000 && zipcode <= 99499) {
        st = 'WA';
        state = 'Washington_(state)';
    } else if (zipcode >= 24700 && zipcode <= 26999) {
        st = 'WV';
        state = 'West Virginia';
    } else if (zipcode >= 53000 && zipcode <= 54999) {
        st = 'WI';
        state = 'Wisconsin';
    } else if ( (zipcode >= 82000 && zipcode <= 83199) || zipcode == 83414 ) {
        st = 'WY';
        state = 'Wyoming';
    } else {
        st = 'none';
        state = 'none';
        console.log('No state found matching', zipcode);
    }

    return state;
}

function doState(zip, callback){
    const state = getState(zip);
    let url = "https://en.wikipedia.org/wiki/List_of_radio_stations_in_" + state;
    console.log(url);
    let output = startBrowser(url);
    return output;
}

async function startBrowser(url, callback){
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
      });
    
    const page = await browser.newPage();
    
    await page.goto(url, {
        waitUntil: "domcontentloaded",
    });
    
    await page.waitForSelector("table.wikitable")
    
    let output = [];

    const recordList = await page.$$eval('tbody > tr',(rows)=>{
        return Array.from(rows, row => {
            const col = row.querySelectorAll('td, th');
            return Array.from(col, c=> c.textContent.trim().replace(/['"]+/g, ''));
        })
    })
    let rowNum = 0;
    recordList.forEach(row => {

        let rowString = '';
        rowNum++;
        for(var i=0; i<5; i++){
            rowString += row[i] + " "
            if(i == 4 && typeof row[4] !== 'undefined'){
                if(row[4].toLowerCase().includes("rock")){
                    // console.log(rowString);
                    output.push(rowString);
                }
            }
        }
    })
    await browser.close();
    if(typeof output == 'undefined'){
        callback(err);
    } else {
        return output;
    }
}

app.post('/', async(req, res, next) => {
    try { 
        let output = await doState(req.body.name);
        // output.forEach(function(item, index){
            
        // });
        const body = JSON
            .stringify(output, null, "\t")
            .replaceAll(
                "],\n\t\"", 
                "],\n\n\t\""
            );
        res.json(output)
    } catch(error) {
        return next(error);
    }
    
 });

 app.get('*', (req, res) => {
    res.sendFile(__dirname + '/index.html');
 });

app.listen(3001, function() {
    console.log("Running on port 3001")
})