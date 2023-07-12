async function details(e){
    e.preventDefault();
    let obj = {
        firstName:document.getElementById("firstName").value,
        lastName:document.getElementById("lastName").value,
        email:document.getElementById("email").value,
        password:document.getElementById("password").value
    };
    let res = await axios.post('http://localhost:5000/adduser',obj);

    let newdiv = document.createElement("div");
    if(res.data.pass){
        newdiv.className = "alert alert-success";
    }else{
        newdiv.className = "alert alert-danger";
    }
    
    newdiv.role = "alert";
    let child = document.createElement("p");
    child.textContent = `${res.data.res}`;
    newdiv.appendChild(child);
    let warning = document.getElementById("warning")
    warning.className = "card card-body";
    warning.appendChild(newdiv);
}
  
}

async function login(e){
    e.preventDefault();
    let obj = {
        email:document.getElementById("email").value,
        password:document.getElementById("password").value
    }
    let res = await axios.post('http://localhost:5000/login',obj);

    let newdiv = document.createElement("div");
    if (res.data.pass){
        newdiv.className = "alert alert-success";
    }else{
        newdiv.className = "alert alert-danger";
    }
    
    newdiv.role = "alert";
    let child = document.createElement("p");
    child.textContent = `${res.data.res}`;
    newdiv.appendChild(child);
    let warning = document.getElementById("warning")
    warning.className = "card card-body";
    warning.appendChild(newdiv);
}
