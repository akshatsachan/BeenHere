async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    let count = 1;
        for(var node in data)
        {
            const table = document.getElementById("table-body");

            const row = document.createElement('tr');
            
            const first = document.createElement('th');
            first.setAttribute("scope","row");
            first.textContent = count;

            const name = document.createElement('td');
            name.textContent = (JSON.stringify(data[node].name));

            const timestamp = document.createElement('td');
            timestamp.textContent = (JSON.stringify(data[node].timestamp));

            const lattitude = document.createElement('td');
            lattitude.textContent = (JSON.stringify(data[node].lattitude));

            const longitude = document.createElement('td');
            longitude.textContent = (JSON.stringify(data[node].longitude));

            const imgelement = document.createElement('td');

            const image = document.createElement('img');
            image.src = data[node].image;

            imgelement.appendChild(image);

            row.appendChild(first);
            row.appendChild(name);
            row.appendChild(timestamp);
            row.appendChild(lattitude);
            row.appendChild(longitude);
            row.appendChild(imgelement);

            table.appendChild(row);

            console.log(data[node]);
            ++count;
        }
    
    
}
getData();