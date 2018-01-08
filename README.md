
<img align="center" width="600" title="Care by Numbers logo" src="public/assets/img/med_res_logo.png">
<hr>

## In collaberation with [The Amazing Professionals](https://github.com/theamazingprofessionals/care-cost)

## Synopsis

Care by Numbers is a web-based application that provides a detailed, data-driven look into the alarming healthcare cost disparity that exists from state to state and hospital to hospital. 
  Starting with a handful of procedures to help highlight these issues, visitors are first greeted with some high-level data charts of cost differences on a country-wide level and are then free to broswer and dig deeper. 
  After finding a dataset of Medicare Inpatient Provider Charges that both shocked and intrigued, we thought it'd be great to visualize this data in a way that would be both informative and fun to play with.  
<br>

## Features

Current Supported Features:
* Browse medicare cost data from a handful of feature procedures from hospitals across the country
* View [charts.js](http://www.chartjs.org/) bar chart of country-wide minimum and maximum prices
* Browse [amCharts](https://www.amcharts.com/) choropleth map showing state cost averages
* Click on a state to zoom in and explore cost data from every individual hospital
* View region-wide minimum and maximum cost data for individual states
<br>


### Prerequisites

You will need

* [Node.js](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/) 

### Installing

If you would like to run this application locally, go to command line and type in:

```
git clone https://github.com/mkdoh3/care-cost.git
```
You will have to build the sql database locally using mysql workbench, or another similar utility. The necessary seed files and schema can be found in the 'db' folder.

To install the needed modules, while still in terminal, type: 
```
npm install
```
To start the app from inside your cloned project, type:
```
npm start
```

View the app locally in you browser at: https://localhost:8080

### Available API Endpoints
View all procedures:
```
/api/procedures
```
Procedures by id
```
/api/procedures/:id
```
Cost data
```
/api/cost
```
Cost data by zipcode
```
/api/cost/:zip
```
Cost data by procedure id and state
```
/api/cost/:state/:id
```
State wide average cost for a given
```
/api/avg/:id
```
Country-wide min/max cost data for a given procedure
```
/api/mm/:id
```
Region-wide min/max cost data for a given procedure and state
```
/api/mm/:state/:id
```
## Technologies Used

| Built With   |
| ------------- |
| CSS Grid & Bootstrap 4|
| MySQL & Sequelize|
| Node & Express|
| AMCharts & Charts.js|
| Handlebars.js & JQuery|
