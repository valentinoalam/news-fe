export const registerUser = async (email: string, name: string, password: string) => {
    try {
        const response = await fetch('https://your-backend-url/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, name, password }),
        });
    
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
    
        return data; // Success response
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
  };
  