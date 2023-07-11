async function details(e){
    e.preventDefault();
    let obj = {
        firstName:document.getElementById("firstName").value,
        lastName:document.getElementById("lastName").value,
        email:document.getElementById("email").value,
        password:document.getElementById("password").value
    };
    let res = await axios.post('http://localhost:5000/adduser',obj);
}
