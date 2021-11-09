function generateSingleRound(table, data, round) {
    generateTableHead(table, ["Lag", "Poeng"]);
    if (!data.length) {
        return;
    }
    for (let pub of data) {
        const row = table.insertRow();
        row.insertCell().appendChild(document.createTextNode(pub["Lag"]));
        row.insertCell().appendChild(document.createTextNode(pub["Poeng"][round]));
    }
}
