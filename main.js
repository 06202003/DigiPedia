const csvFilePath = 'data/DigiDB_digimonlist.csv';

fetch(csvFilePath)
  .then((response) => response.text())
  .then((csvData) => {
    const csvDataDiv = document.getElementById('csvData');
    const table = document.createElement('table');
    const rows = csvData.split('\n');
    const headers = rows[0].split(',');

    const columnsToDisplay = ['Number', 'Digimon', 'Stage', 'Type', 'Attribute', 'Memory', 'Equip Slots'];
    const columnIndices = columnsToDisplay.map((column) => headers.indexOf(column));

    const headerRow = document.createElement('tr');
    columnsToDisplay.forEach((column) => {
      const th = document.createElement('th');
      th.textContent = column;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].split(',');
      const row = document.createElement('tr');
      columnIndices.forEach((index) => {
        const cell = document.createElement('td');
        cell.textContent = rowData[index];
        row.appendChild(cell);
      });
      table.appendChild(row);
    }

    csvDataDiv.appendChild(table);
  })
  .catch((error) => {
    console.error('Error fetching or parsing the CSV:', error);
  });
