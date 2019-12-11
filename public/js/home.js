let mesg1 = document.querySelector('.mesg1');
let mesg2 = document.querySelector('.mesg2');
let weatherForm = document.querySelector('form');



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let address = document.querySelector('#address').value;
    mesg1.textContent  = "Loading ....";
    mesg2.textContent  = "";

    fetch(`/weather?address=${address}`).then((respons)=>{
        if (respons.status !==200 || respons.error){
            mesg1.textContent = respons.error;
            return;
        }
        respons.json().then((data)=>{
           mesg1.textContent = "";
           for (item in data){
             mesg2.innerHTML += `<b>${ data[item]}</b><br>`;
           }

        });
    }).catch((err)=>{
        console.log(err);
    });


});
