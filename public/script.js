var count = 0;

function setup(){
    console.log(count);
    ++count;
    noCanvas();
    const video = createCapture(VIDEO);
    let viewPortHeight = window.innerHeight;
    let viewPortWidth = window.innerWidth;
    
    console.log(viewPortHeight + " " + viewPortWidth);
    
    if(viewPortHeight<=viewPortWidth)
    {
        video.size(320,240);
        video.position(100,125);
    }
    
    window.addEventListener('resize',()=>{
        viewPortHeight = window.innerHeight;
        viewPortWidth = window.innerWidth;
        console.log("resizing");
        console.log(viewPortHeight + " " + viewPortWidth);

        video.size(viewPortWidth/4,240);
        video.position((viewPortWidth*3)/4,viewPortHeight/5);

        
    });
    
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition( async (position) => {
    
        const lat = await  position.coords.latitude;
        const lon = await position.coords.longitude;
        document.getElementById('btn').addEventListener('click',async ()=>{
            ++count;
            const ans = document.createElement("div");
            
            ans.setAttribute("class","alert alert-success");

            const first = document.createElement("span");
            first.setAttribute("class","spanclass");
            first.textContent = "Lattitude: ";
            

            const second = document.createElement("span");
            second.setAttribute("class","spanclass");
            second.textContent = "Longitude: ";
            

            const one = document.createElement("span");
            one.setAttribute("id","lat"+count);
            first.appendChild(one);

            const two = document.createElement("span");
            two.setAttribute("id","lon"+count);
            second.appendChild(two);

            ans.appendChild(first);
            ans.appendChild(second);

            document.getElementById('div1').appendChild(ans);

            video.loadPixels();
            const image64 = video.canvas.toDataURL();
            //console.log(image64);
            const name = document.getElementById("inputdat").value;
            document.getElementById("lat"+count).textContent = lat;
            document.getElementById("lon"+count).textContent = lon;
            const data = {lat ,lon, name, image64};
            const options = {
                method: "POST",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data)
            }
            const response = await fetch('/api',options); //Getting a response from the post request and sending the data to the request
            const otherdata  = await response.json();
            console.log(otherdata);
        });
        
    });
    } else {
    console.log("The location can be accessed");
    }
    
}
