const data = [
    { Lag: "Monte Falco", Poeng: [1, 2, 123] },
    { Lag: "Monte Falterona", Poeng: [1654, 123, 123] },
    { Lag: "Poggio Scali", Poeng: [1520, 34, 123] },
    { Lag: "Pratomagno", Poeng: [1592, 34, 123] },
    { Lag: "Monte Amiata", Poeng: [1738, 34, 123] }
];

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

function generateMultipleRounds(table, data) {
    if (!data.length) {
        return;
    }

    const firstRow = data[0];
    const rounds = range(firstRow["Poeng"].length, 1);
    const cols = rounds.unshift("Lag");
    generateTableHead(table, rounds);
    
    for (let pub of data) {
        const row = table.insertRow();
        row.insertCell().appendChild(document.createTextNode(pub["Lag"]));
        const points = pub["Poeng"];
        for (let round in points) {
            row.insertCell().appendChild(document.createTextNode(points[round]));
        }
    }
}

const singleRoundTable = document.querySelector(".singleRound");
generateSingleRound(singleRoundTable, data, 1);
const multipleRoundsTable = document.querySelector(".multipleRounds");
generateMultipleRounds(multipleRoundsTable, data);
