import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

export default function Signup() {
    const { signup } = useContext(AuthContext);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await signup(form);
        setLoading(false);
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-green-100 to-white px-4 py-8">
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg py-4 px-8">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">
                    Create Your Account
                </h2>
                <p className="text-sm text-gray-600 text-center">
                    Enter your details below to create your account
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div className="flex justify-between gap-8 items-center">
                        <Input
                            name="firstName"
                            label="First Name"
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            name="lastName"
                            label="Last Name"
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <Input
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="johnDoe@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                    <div className="relative">
                        <Input
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            icon={<Lock className="w-4 h-4 text-gray-400" />}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[34px] text-gray-500"
                            tabIndex={-1}
                        >
                            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                    </div>

                    <div className="relative">
                        <Input
                            label="Confirm Password"
                            name="confirmPassword"
                            type={showConfirm ? "text" : "password"}
                            value={form.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            required
                            icon={<Lock className="w-4 h-4 text-gray-400" />}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-[34px] text-gray-500"
                            tabIndex={-1}
                        >
                            {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                    </div>

                    <Button
                        type="submit"
                        loading={loading}
                        loaderText="Creating Account..."
                        className="mt-6"
                    >
                        Create Account
                    </Button>
                </form>

                <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-xs text-gray-500">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <button
                    type="button"
                    className="w-full border border-green-400 text-green-600 flex justify-center items-center py-2 rounded-md hover:bg-green-50"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="h-4 w-4 mr-2"
                    />
                    Continue with Google
                </button>

                <p className="text-sm mt-6 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
