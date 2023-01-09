// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

// Building a table for the data 
//and clearing out any existing data
function buildTable(data) {
        tbody.html("");

// For Loop to iterate through data and add to table
data.forEach((dataRow) => {
    //append the row to the table body
    let row = tbody.append("tr");
    //Loop through the fields and add each vale as a cell in the table. 
    Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
      );
    });
}

//Empty filters variable
var filteredVariable = {};

// Add buttons too filter the data in the table
function updateFilters() {
    //gather element from filter
    let changedElement = d3.select(this);
    //gathers value that is selected from element
    let elementValue = changedElement.property("value");

    let property = changedElement.attr("id");
    //filter to only show rows whose values meet the filtered data
    if (elementValue) {
        filteredVariable[property] = elementValue; 
    }

    else {
        delete filteredVariable[property]
    }
    filterTable();
};

//filter table data by value that is entered for the "id" that has changed
function filterTable() {
    let filteredData = tableData;
    Object.entires(filteredVariable).forEach(([key,value])=>{
        filteredData = filteredData.filter(row => row[key] === value);
    })
    
    buildTable(filteredData);
}

// Attach an event to listen for the change
d3.selectAll("input").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);