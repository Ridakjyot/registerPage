async function postData(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get user input
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Create user object
    const user = {
        username: username,
        email: email,
        password: password
    };

    try {
        // Make a POST request to the server
        const response = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        // Check if the request was successful (status code 200-299)
        if (response.ok) {
            alert('Signup successful!');
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error signing up. Please try again later.');
    }
}