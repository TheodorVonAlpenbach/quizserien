let tableData;

const getData = async function() {
    const res = await fetch('http://localhost:3001/pubdata');
    tableData = await res.json();
    return tableData;
}

function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

function generateTableHead(table, columnHeaders) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let i in columnHeaders) {
        let th = document.createElement("th");
        let text = document.createTextNode(columnHeaders[i]);
        th.appendChild(text);
        row.appendChild(th);
    }
}

const reducer = (accumulator, curr) => accumulator + curr;

function generateMultipleRounds(table, data, pubName) {
    if (!data) {
        return;
    }

    const firstRow = data[0];
    const pubs = data["pubs"];
    const pub = pubs[pubName];

    const totalRounds = data["config"]["Runder totalt"];
    const countingRounds = data["config"]["Runder tellende"];
    let cols = range(totalRounds, 1);
    cols.unshift("Lag");
    cols.push("Total", "Tellende");

    const pubHeader = document.querySelector(".pubHeader");
    pubHeader.innerText = "Resultater " + pubName;
    console.log(pubHeader)
    generateTableHead(table, cols);

    let tbody = document.getElementsByTagName("tbody")[0];
    if (tbody)
        tbody.remove();
    tbody = table.createTBody();

    for (let team in pub) {
        const row = tbody.insertRow();
        row.insertCell().appendChild(document.createTextNode(team));
        const points = pub[team];
        for (let round in points) {
            row.insertCell().appendChild(document.createTextNode(points[round]));
        }
        const sum = points.reduce(reducer);
        row.insertCell().appendChild(document.createTextNode(sum));
        const sumCounting = points.sort().slice(totalRounds - countingRounds).reduce(reducer);
        row.insertCell().appendChild(document.createTextNode(sumCounting));
    }
}

function generate1(data) {
    const singleRoundTable = document.querySelector(".singleRound");
    // generateSingleRound(singleRoundTable, data, 1);
    const multipleRoundsTable = document.querySelector(".multipleRounds");
    let pubName = "Fru Burums";
    pubName = "Dirty Nelly";
    generateMultipleRounds(multipleRoundsTable, data, pubName);
}

function generate() {
    if (!tableData) {
        getData().then(x => generate1(x));
    }
    else {
        generate1(tableData);
    }
}

generate();
