//fetch("http://localhost:5000")
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const tableBody = document.querySelector("#market-table");
    data.forEach((rowData) => {
      const row = document.createElement("tr");
      for (const key in rowData) {
        const cell = document.createElement("td");
        cell.textContent = rowData[key];
        row.appendChild(cell);
      }
      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.log("Error:", error));
