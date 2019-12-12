let mesg1 = document.querySelector('.mesg1');
let mesg3 = document.querySelector('.mesg3');
let weatherForm = document.querySelector('form');



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let address = document.querySelector('.address').value;
    mesg1.style.display = 'block';
    mesg3.textContent  = "";

    fetch(`/weather?address=${address}`).then((respons)=>{
        if (respons.status !==200 || respons.error){
            mesg1.textContent = respons.error;
            return;
        }
        respons.json().then((data)=>{
            mesg1.style.display = 'none';
            mesg3.style.display = 'block';

            for (item in data){
             mesg3.innerHTML +=`<tr> <td>${item}</td> <td>${ data[item]}</td> </tr>`;
           }

        });
    }).catch((err)=>{
        console.log(err);
    });


});
