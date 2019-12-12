let mesg1 = document.querySelector('.mesg1');
let mesg3 = document.querySelector('.mesg3');
let errmesg = document.querySelector('.errmesg');
let weatherForm = document.querySelector('form');



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let address = document.querySelector('.address').value;
    mesg1.style.display = 'block';
    mesg3.textContent  = "";
    errmesg.textContent  = "";

    fetch(`/weather?address=${address}`).then((respons)=>{
        if (respons.status !==200){
            mesg1.textContent ="Sorry ,Please Try Again";
            return;
        }
        respons.json().then((data)=>{
            mesg1.style.display = 'none';
            if(data.error){
                errmesg.style.display = 'block';
                errmesg.textContent  = data.error;
               return;
            }
            mesg3.style.display = 'block';
            for (item in data){
             mesg3.innerHTML +=`<tr> <td>${item}</td> <td>${ data[item]}</td> </tr>`;
           }

        });
    }).catch((err)=>{
        mesg1.textContent = "Sorry ,Please Try Again";
    });


});
