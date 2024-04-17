async function registerUser(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const newUser = {
        name,
        email,
        password
    }
    try {
        const createdUser = await fetch('/api/v1/users/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });

        const createdUserJSON = await (await createdUser).json();

        if (createdUser){
            alert(createdUserJSON.message);
        }
    } catch (error){
        alert('There was an error!')
    }
}

async function loginUser(event){
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userSigninData = {
        email,
        password
    }

    try {
        const loggedInUser = await fetch('/api/v1/users/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userSigninData)
        });

        const loggedInUserJSON = await (await loggedInUser).json();

        if (loggedInUserJSON){
            localStorage.setItem('token', loggedInUserJSON.data.token);
            alert(loggedInUserJSON.message);
            window.location.href = 'http://localhost:4000/home.html';
        }
    } catch (error){
        alert('There was an error!')
    }
}