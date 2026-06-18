import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    
        const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        console.log("FORM SUBMITTED");
        console.log(formData);
      
        try {
          setLoading(true);
          setError("");
      
          const data = await registerUser(formData);
      
          console.log("API RESPONSE:", data);
      
          localStorage.setItem(
            "token",
            data.token
          );
      
          navigate("/dashboard");
        } catch (err) {
          console.log("FULL ERROR:", err);
          console.log("RESPONSE:", err.response);
      
          setError(
            err.response?.data?.message ||
            err.message ||
            "Registration Failed"
          );
        } finally {
          setLoading(false);
        }
      };
    

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Register
                </h1>

                {error && (
                    <p className="text-red-500 mb-4">
                        {error}
                    </p>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                        required />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                        required />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                        required />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded"
                    >
                        {loading
                            ? "Creating Account..."
                            : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;