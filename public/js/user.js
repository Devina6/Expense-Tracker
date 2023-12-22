const signupBtn = form2.querySelector("#signup");
signupBtn.addEventListener("click",signup);

const loginBtn = form1.querySelector("#login");
loginBtn.addEventListener("click",login );

const recoveryBtn = form1.querySelector("#accRecovery");
recoveryBtn.addEventListener("click",password );

async function signup(e){
    e.preventDefault();
    console.log('new user')
    let obj = {
        firstName:document.getElementById("firstName").value,
        lastName:document.getElementById("lastName").value,
        email:document.getElementById("email").value,
        password:document.getElementById("password").value
    };
    let res = await axios.post('/adduser',obj);

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
    warning.appendChild(newdiv);
}
async function login(e){
    e.preventDefault();
    let obj = {
        email:document.getElementById("email").value,
        password:document.getElementById("password").value
    }
    let res = await axios.post('/login',obj)
    localStorage.setItem('token',res.data.token)
    let newdiv = document.createElement("div");
    if (res.data.pass){
        newdiv.className = "alert alert-success";
        window.location.href = 'expense';
    }else{
        newdiv.className = "alert alert-danger"
    }
    
    newdiv.role = "alert";
    let child = document.createElement("p");
    child.textContent = `${res.data.res}`;
    newdiv.appendChild(child);
    let warning = document.getElementById("warning")
    warning.appendChild(newdiv);
    
}

async function password(e){
    e.preventDefault();
    let obj = {
        email:document.getElementById("email").value
    }
    try{
        let res = await axios.post('/forgotpassword',obj)
        localStorage.setItem("userToken",res.data.userToken);
        localStorage.setItem("passwordToken",res.data.passwordToken);

    }
    catch(err){
        console.log(err);
    }    
}

