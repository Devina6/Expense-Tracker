let token = localStorage.getItem('token');

function displayExpense(expense){
    let parentTBody = document.getElementById('tableBody');
    let childTRow = document.createElement('tr');
    let childTRHData1 = document.createElement('td');
    let childTRHData2 = document.createElement('td');
    let childTRHData3 = document.createElement('td');
    let childTRHData4 = document.createElement('td');
    childTRow.setAttribute('data-key',expense.id);
    childTRHData1.textContent = expense.updatedAt
    childTRHData2.textContent = expense.amount
    childTRHData3.textContent = expense.description
    childTRHData4.textContent = expense.category
    parentTBody.appendChild(childTRow);
    childTRow.appendChild(childTRHData1)
    childTRow.appendChild(childTRHData2)
    childTRow.appendChild(childTRHData3)
    childTRow.appendChild(childTRHData4)
    
}
async function expenseFilter(e){
    e.preventDefault();
    let obj = {
        category:document.getElementById('category').value,
        month:document.getElementById('month').value,
        year:document.getElementById('year').value
    } 
    localStorage.setItem('filterExpense',JSON.stringify(obj));
    try{
        const result = await axios.post('http://localhost:5000/premium/filterexpenses',obj,{headers:{"userAuthorization":token}})
        if(result.data.success){
            for(let i=0;i<result.data.expenses.length;i++){
                displayExpense(result.data.expenses[i]);
            }
        }
        else{
            alert('no expense for given filters')
            const parent = document.getElementById('tableBody');
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
              }
        }
        
        
    }
    catch(err){
        console.log(err)
    } 
}

async function download(e){
    e.preventDefault();
    try{
        const filterExpense = localStorage.getItem('filterExpense');
        const obj = JSON.parse(filterExpense)
        const file = await axios.post('http://localhost:5000/premium/download',obj,{headers:{"userAuthorization":token}})
        //console.log(file.data.fileURL)
        const createlink = document.createElement("a");
        createlink.href = file.data.fileURL;
        createlink.download = "expense.txt";
        createlink.click();
    alert("Your file is downloaded");
    }
    catch(err){
        console.log(err);
    }
    
}
