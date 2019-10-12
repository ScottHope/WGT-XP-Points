document.addEventListener("DOMContentLoaded", function () {
  var url = "WGT XP table.xml";
  fetch(url)
    .then(function (response) {
      return response.text()
    })
    .then(function (data) {
      // console.log(data);
      let parser = new DOMParser();
      let xml = parser.parseFromString(data, "application/xml");
      // document.getElementById("output").textContent = data;
      console.log(xml);
      buildDayList(xml);
    });
})

function buildDayList(x) {
  let table = document.getElementById("days");
  let dais = x.getElementsByTagName("level");
  let head = "<tr class=\"head\"><th>LEVEL</th><th>XP POINTS</th><th>DIFFERENCE</th></tr>";
  table.innerHTML = head;
  let tbody = document.getElementsByTagName("tbody");
  for (let i = 0; i < dais.length; i++) {
    let level_1 = i === 0 ? 0 : dais[i - 1].getAttribute("xpRequired");
    let level = dais[i].getAttribute("id") * 1;
    let xp = dais[i].getAttribute("xpRequired") * 1;
    let diff = i === 0 ? undefined : (xp - level_1).toLocaleString();
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.textContent = level;
    tr.appendChild(td1);
    let td2 = document.createElement("td");
    td2.textContent = xp.toLocaleString();
    tr.appendChild(td2);
    let td3 = document.createElement("td");
    td3.textContent = diff;
    tr.appendChild(td3);
    table.appendChild(tr);
  }
}