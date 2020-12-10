function setup(){
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(320,240);

    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition( async (position) => {
    
        const lat = await  position.coords.latitude;
        const lon = await position.coords.longitude;
        document.getElementById('btn').addEventListener('click',async ()=>{
            video.loadPixels();
            const image64 = video.canvas.toDataURL();
            //console.log(image64);
            const name = document.getElementById("inputdat").value;
            document.getElementById("lat").textContent = lat;
            document.getElementById("lon").textContent = lon;
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
