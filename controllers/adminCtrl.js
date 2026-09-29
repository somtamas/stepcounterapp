async function getAllUsers(req, res) {
    const response = await fetch('http://localhost:3000/admin/users',
        {
            method:'POST',
            headers:
            {
                "Content-Type":"application/json"
            },
            body : JSON.stringify({ luid: 1 }),
        });
       
     
    if(response.status!=200)
        {
            const res = await response.json()
           
            showMessage('danger','ERROR', res.error)
           
        }
    else
        {
 
       
    const users = await response.json();
    console.log(users);
    drawTable(users);
        }
}
 
 
function drawTable(users) {
 
    let usersCount = document.querySelector('#usersCount');
 
    usersCount.innerHTML = users.length;
 
    users.forEach((user, index) => {
 
        addTableRow(user, index);
 
    });
 
}
 
function addTableRow(user, index) {
 
    let usersList = document.querySelector('#usersList');
 
    let tr = document.createElement('tr');
 
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
    let td7 = document.createElement('td');
 
    td1.innerHTML = (index + 1) + '.';
    td2.innerHTML = user.name;
    td3.innerHTML = user.email;
    td4.innerHTML = moment(user.created_at).format('YYYY-MM-DD - H:mm');
    td5.innerHTML = user.last_login ? moment(user.last_login, "YYYYMMDDHmm").fromNow() : 'never';
    td6.innerHTML = user.login_count;
 
    let isActive = user.is_active ? 'checked' : '';
 
    td7.innerHTML = '<div class="form-check form-switch float-end"><input class="form-check-input" type="checkbox" role="switch" id="is_active" ' + isActive + '></div>';
 
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
 
    usersList.appendChild(tr);
}

function drawTable(users) {

}

function addTableRow(user, index) {

}

async function getStatistics() {
    let luid = loadUser() ? loadUser().id : 0;

    const response = await fetch(`http://localhost:3000/users/${luid}/passmod`, {
        method: 'POST',
        headers: {
            "Content-Type" : "Application/json"
        },
        body: JSON.stringify(luid)
    });

    if(response.status != 200) {
            let res = await response.json();
            console.log(users);
            drawTable(users);
    } else {
            let results = await response.json();
            drawDashboard(results);
    }
}

function drawDashboard(results) {
    let totalStep = document.querySelector('#totalStep');
    let totalKm = document.querySelector('#totalKm');
    let avgSteps = document.querySelector('#avgSteps');
    let avgKm = document.querySelector('#avgKm');

    totalStep.innerHTML = results[0][0].total + ' steps';
    totalKm.innerHTML = Math.round((results[0][0].total * 0.7) / 1000) + ' km';
    avgSteps.innerHTML = results[0][0].avg + ' steps';
    totalKm.innerHTML = Math.round((results[0][0].total * 0.7) / 1000 + ' km');

    let topUsers = document.querySelector('#topUsers');

    results[0][1].forEach((user, index) => {
        let km = Math.round((user.steps * 0.7) / 1000)
        topUsers.innerHTML += `
            <tr>
                <td>${index}</td>
                        <td class="text-start">
                            ${user.name} <br> <small>${user.email}</small>
                        </td>
                        <td class="text-end">${user.steps} steps<br> <small>${km} km</small></td>
            </tr>
        `;
    });
}