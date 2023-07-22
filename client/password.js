async function resetPassword(e){
    e.preventDefault();
    const userToken = localStorage.getItem("userToken");
    const passwordToken = localStorage.getItem("passwordToken");
    try{
        let page  = await axios.post('https://localhost:5000/password',{headers:{"userAuthorization":userToken,"passwordAuthorization":passwordToken}});
    }
    catch(err){
        console.log(err)
    }
}


async function passwordreset(e){
    e.preventDefault();
    const userToken = localStorage.getItem("userToken");
    const passwordToken = localStorage.getItem("passwordToken");

    try{
        const newpassword = document.getElementById('newpassword').value;
        const renewpassword = document.getElementById('renewpassword').value;
        if(newpassword===renewpassword){
            let obj = {
                email:document.getElementById('email').value,
                password:newpassword,
            }

            let reset = await axios.post(`http://localhost:5000/resetpassword`,obj,{headers:{"userAuthorization":userToken,"passwordAuthorization":passwordToken}})
            console.log(reset)
        }else{
            
            alert("password dont match");
        }
    }
    catch(err){
        console.log(err)
    }
}
