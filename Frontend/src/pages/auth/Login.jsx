import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

export default function Login() {
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        await login({ email, password });
        setLoading(false);
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-green-100 to-white px-4 pt-16">
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg py-6 px-8" >
                <h2 className="text-2xl font-semibold text-gray-800 text-center">Welcome Back</h2>
                <p className="text-sm text-gray-600 text-center mb-8">
                    Enter your email to sign in to your account
                </p>

                <form onSubmit={handleLogin} className="space-y-8">
                    {/* Email Field */}
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="johnDoe@example.com"
                        required
                        icon={<Mail className="w-4 h-4 text-gray-400" />}
                    />

                    {/* Password Field with Toggle */}
                    <div className="mt-6 relative">
                        <Input
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                    {/* Submit */}
                    <Button
                        type="submit"
                        loading={loading}
                        loaderText="Logging in..."
                        className="mt-8"
                    >
                        Login
                    </Button>
                </form>

                {/* OR */}
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-xs text-gray-500">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Google Auth */}
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

                {/* Bottom Link */}
                <p className="text-sm mt-6 text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
}
