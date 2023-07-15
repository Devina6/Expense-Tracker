let token = localStorage.getItem('token');

window.onload = () => {
    await axios.get('http:localhost:5000/purchase/ispremium',{headers:{"Authorizaton":token}})
        .then(response1 => {
            if(response1.data){
                let data = document.getElementById('premiumdata');
                data.textContent = "You are a PREMIUM User!"
                let btn = document.getElementById('leaderBtn');
                btn.style.visibility = 'visible';
            }
            else{
                let btn = document.getElementById('razorpayBtn');
                btn.style.visibility = 'visible';
            }
            axios.get('http:localhost:5000/expense/index',{headers:{"Authorizaton":token}})
                .then(response2 => {
                    for(var i=0;i<response2.data.length;i++){
                        displayExpense(response2.data[i]);
                    }
                })
                .catch(err => console.log(err))
        }).catch(err => console.log(err))
}


async function expense(e){
    e.preventDefault();
    let obj = {
        amount:document.getElementById("amount").value,
        description:document.getElementById("description").value,
        category:document.getElementById("category").value
    }
    await axios.post('http://localhost:5000/expense/addExpense',obj,{headers:{"Authorizaton":token}})
        .then(result => {
            displayExpense(result.data);
            window.location.reload;
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
            await axios.get(url,{headers:{"Authorizaton":token}})
                .then(response => {
                    tBody.removeChild(tRow);
                    window.location.reload;
                })
                .catch(err => console.log(err))
            
        }
    }
}

async function premium(e){
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    let response = await axios.get('http://localhost:5000/purchase/premiummembership',{headers:{"Authorizaton":token}})
    let options = {
                key:response.data.key_id, //Enter the key ID generated from the dashboard
                order_id:response.data.order.id, //for one time payment
                //this handler function will handle the success payment
                handler:async function (response){
                    try{
                        await axios.post('http://localhost:5000/purchase/updatetransactionstatus',{
                            order_id:options.order_id,
                            payment_id:response.razorpay_payment_id,
                        },
                        {
                            headers:{"Authorizaton":token}
                        })
                        .then((result)=>{
                            let btn = document.getElementById('razorpayBtn');
                            btn.style.visibility = 'hidden';
                            //alert("You are a PREMIUM user now");
                            let data = document.getElementById('premiumdata');
                            data.textContent = "You are now a PREMIUM User!"
                        })
                        .catch(err => console.log(err))
                    }
                    catch(err){
                        console.log(err);
                    }
                },
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
            e.preventDefault();

            rzp1.on('payment.failed',function(response1){
                try{
                       await axios.post('http://localhost:5000/purchase/updatetransactionstatus',{
                            order_id:orderid,
                            payment_id:"00000000"
                        },{
                            headers:{"Authorizaton":token}
                        })
                        .then(result1 => {
                            alert('Transaction Failure, not a premium user');
                        }) 
                }
                catch (err){
                    console.log(err)
                   } 
            })    
            })
            .catch(err => console.log(err))
}

async function leaderBoard(e){
    e.preventDefault();
    axios.get('http://localhost:5000/premium/leaderboardstatus')
        .then(lists => {
            lists.data.forEach(list => {
                displayStatus(list)
            })
            
        })
        .catch(err => console.log(err));
}

function displayStatus(list){
    let parent = document.getElementById('leaderOrder');
    let child = document.createElement('li');
    child.textContent =`${list.firstName}`+" "+`${list.lastName}`+" ---> "+`${list.total_expense}`;
    parent.appendChild(child);
    
}
