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
            name.textContent = (data[node].name);

            const timestamp = document.createElement('td');
            const d = new Date(data[node].timestamp);
            timestamp.textContent = d.toLocaleDateString() + "\n" +d.toLocaleTimeString();

            const lattitude = document.createElement('td');
            lattitude.textContent = (JSON.stringify(data[node].lattitude));

            const longitude = document.createElement('td');
            longitude.textContent = (JSON.stringify(data[node].longitude));

            const imgelement = document.createElement('td');

            const image = document.createElement('img');
            image.src = data[node].image;

            imgelement.appendChild(image);

            const button_element = document.createElement('td');

            const button = document.createElement('button');

            const button_logo = document.createElement("img");
            button_logo.src = "../images/delete-black-36dp.svg";
            button_logo.setAttribute("style","color: red");
            button.appendChild(button_logo);

            button.setAttribute("class","btn btn-outline-danger");
            button.setAttribute("id",JSON.stringify(data[node]._id));

            //Adding event listener to button element
            button.addEventListener('click',async ()=>{
                const element_id = button.getAttribute("id");
                const options = {
                    method: "delete",
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({element_id})
                };
                const response = await fetch('/api',options);
                const real_response = await response.json();
                //console.log(real_response);

                await window.location.reload(); //for reloading window to show the updated list
                //console.log("element with name "+JSON.stringify(data[node].name)+"should be deleted");
            });

            button_element.appendChild(button);

            row.appendChild(first);
            row.appendChild(name);
            row.appendChild(timestamp);
            row.appendChild(lattitude);
            row.appendChild(longitude);
            row.appendChild(imgelement);
            row.appendChild(button_element);

            table.appendChild(row);

            console.log(data[node]);
            ++count;
        }
    
    
}
getData();