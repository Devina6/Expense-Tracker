window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const user_id = urlParams.get('user_id');

    axios.get(`http:localhost:5000/expense/index/${user_id}`)
        .then(response => {
            for(var i=0;i<response.data.length;i++){
                displayExpense(response.data[i]);
            }
        })
        .catch(err => console.log(err))
}


async function expense(e){
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const user_id = urlParams.get('user_id');
    let obj = {
        amount:document.getElementById("amount").value,
        description:document.getElementById("description").value,
        category:document.getElementById("category").value
    }
    await axios.post(`http://localhost:5000/expense/addExpense/${user_id}`,obj)
        .then(result => {
            displayExpense(result.data);
        })
        .catch(err => console.log(err))
}

function displayExpense(expense){
    let parentTBody = document.getElementById('tableBody');
    let childTRow = document.createElement('tr');
    let childTRHData1 = document.createElement('td');
    let childTRHData2 = document.createElement('td');
    let childTRHData3 = document.createElement('td');
    childTRow.setAttribute('data-key',expense.id);
    childTRHData1.textContent = expense.amount
    childTRHData2.textContent = expense.description
    childTRHData3.textContent = expense.category
    parentTBody.appendChild(childTRow);
    childTRow.appendChild(childTRHData1)
    childTRow.appendChild(childTRHData2)
    childTRow.appendChild(childTRHData3)
    
    let newdiv = document.createElement('div');
    newdiv.className = "btn-group";
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger delete';
    deleteBtn.appendChild(document.createTextNode('Remove'));
    newdiv.appendChild(deleteBtn);
    childTRow.appendChild(newdiv);

    
    
}

var tBody = document.getElementById('tableBody');
tBody.addEventListener('click',removeItem);

async function removeItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            
            let tRow = e.target.parentElement.parentElement;
            const _id = e.target.parentElement.parentElement.getAttribute('data-key');
            
            let url = "http://localhost:5000/expense/delete/"+ _id
            await axios.get(url)
                .then(response => {
                    tBody.removeChild(tRow);
                })
                .catch(err => console.log(err))
            
        }
    }
}
