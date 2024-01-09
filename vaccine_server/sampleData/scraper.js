const fetch = require('node-fetch');
const cheerio = require("cheerio");
const fs = require("fs");

// Define the URLS we will be scraping
// const baseURL = "https://en.wikipedia.org";
// const countriesURL = "/wiki/List_of_European_countries_by_population";

const baseURL = 'https://myspot.nc.gov/#anchor-2';

// Define the method for collecting the data
const getVaccineData = async () => {
    const response = await fetch(baseURL);
    const html = await response.text();
    console.log(html)

    const countriesMap = cheerio("div", html)
        .map(async (index, element) => {
            const name = element.children[0].data; // Get the country name
            // const link = baseURL + element.attribs.href; // Get the link for the country
            const scrapedData = {
                name,
            };
            return scrapedData;
        })
        .get();
    return Promise.all(countriesMap);
};

// Call the method
getVaccineData()
    .then(data => {
        console.log(data);
        // const jsonData = JSON.stringify(data);
        // const filename = "vaccine-data" + ".json";
        // fs.writeFileSync('/Users/eleaneye/Documents/cs290/portfolio_ey38/final_project/data/' + filename, jsonData);
    })
    .catch(error => {
        console.log(error);
    });