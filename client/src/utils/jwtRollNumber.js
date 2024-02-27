const checkAuthentication = () => {
    // Check if the user is authenticated
    // You can use any method of checking authentication here
    // For example, you can check if a token exists in local storage
    const token = localStorage.getItem('token');
    return !!token; // Return true if token exists, false otherwise
};

const fetchRollNumber = async () => {
    try {
        // Make a GET request to an endpoint that returns the user's roll number
        const response = await fetch('https://digital-mess.vercel.app/api/user/rollnumber', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Include the token in the request headers
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch roll number');
        }

        const data = await response.json();
        return data.rollNumber; // Return the roll number from the response
    } catch (error) {
        console.error('Error fetching roll number:', error.message);
        // Handle errors, e.g., show an error message to the user
    }
};

const redirectToLogin = () => {
    window.location.href = "/Login";
};

export default { checkAuthentication, fetchRollNumber, redirectToLogin };