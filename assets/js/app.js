let contentBox = document.getElementById('content');

async function navigate(page) {
    contentBox.innerHTML = await (await fetch(`views/${page}.html`)).text();
}

navigate('/users/home');

function lepescountchange() {
    if(document.getElementById("ujlepesszam").value==="") {
        document.getElementById("lepes_count").innerHTML=10000;
    }
    else {
        document.getElementById("lepes_count").innerHTML=document.getElementById("ujlepesszam").value;
    }
}