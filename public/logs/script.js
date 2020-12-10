async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

        for(var property in data)
        {
            const element = document.createElement('div');
            const elemental1 = document.createTextNode(JSON.stringify(data[property].name));
            const elemental2 = document.createTextNode(JSON.stringify(data[property].lattitude));
            const elemental3 = document.createTextNode(JSON.stringify(data[property].longitude));
            const imgelement = document.createElement('img');
            imgelement.src = data[property].image;
            element.appendChild(elemental1);
            element.appendChild(elemental2);
            element.appendChild(elemental3);
            element.appendChild(imgelement);
            document.getElementById('div1').appendChild(element);
            console.log(data[property]);
        }
    
    
}
getData();