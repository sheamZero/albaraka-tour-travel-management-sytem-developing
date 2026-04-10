import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub, FaFacebook, FaTwitter } from "react-icons/fa"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "../../../hooks/useAuth"
import { uploadImage } from "../../../utils/imageUpload"
import axios from "axios"
import { successAction } from "../../../utils/swal"

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photo, setPhoto] = useState(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false)
    const navigate = useNavigate();
    const { signUpWithEmailPass, updateUserProfile, setUser } = useAuth();
    const location = useLocation();

    const resetForm = () => {
        setName("")
        setEmail("")
        setPhoto(null)
        setPassword("")
        setConfirmPassword("")
        setError("")
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");


        // Password regex
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        if (!passwordRegex.test(password)) {
            setError("Password must be at least 8 characters long and include uppercase, lowercase, and a special character.");
            setSubmitting(false);
            return;
        }
        if (password !== confirmPassword) {
            setSubmitting(false);
            setError("Passwords do not match.");
            return;
        }

        if (!photo) {
            setError("Please upload a profile photo.")
            setSubmitting(false)
            return;
        }



        try {
            // upload image to the imgBB and get url
            const imageUrl = await uploadImage(photo);
            console.log("imgurl", imageUrl);
            // sign up user with email and password
            const result = await signUpWithEmailPass(email, password);
            const loggedInUser = result.user;
            await updateUserProfile(name, imageUrl);

            const updatedUser = {
                ...loggedInUser,
                displayName: name,
                photoURL: imageUrl
            };
            // update user in the authcontext
            setUser(updatedUser);

            const userData = {
                name: name,
                email: email,
                photoURL: imageUrl,
                role: "user",
                createAt: new Date()
            }
            if (loggedInUser) {
                const res = await axios.post("http://localhost:5000/users", userData);
                console.log("saved user", res.data);
                if (res.data?.insertedId) {
                    successAction("Account created successfully!");
                    resetForm();
                    navigate(location.state || "/");
                }
            }



        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <section className="h-screen bg-secondary/5 flex items-center justify-center px-4 py-6">
            <div className="w-full py-8 max-w-lg bg-card rounded-lg shadow-lg overflow-hidden border border-border">

                <div className="px-6 py-5 border-b border-border">
                    <h2 className="text-xl font-semibold text-center text-foreground">
                        Create an Account
                    </h2>
                </div>

                <div className="px-6 py-4">
                    <form onSubmit={handleSignUp} className="space-y-5">
                        {/* Name */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-foreground">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Sheam Hossain"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-foreground placeholder:text-muted-foreground"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-foreground">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-foreground placeholder:text-muted-foreground"
                            />
                        </div>

                        {/* Photo */}
                        <div className="space-y-2">
                            <label htmlFor="photo" className="block text-sm font-medium text-foreground">
                                Photo
                            </label>
                            <input
                                id="photo"
                                type="file"
                                placeholder="Photo URL"
                                required
                                onChange={(e) => setPhoto(e.target.files[0])}
                                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-foreground placeholder:text-muted-foreground"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2 relative">
                            <label htmlFor="password" className="block text-sm font-medium text-foreground">
                                Password
                            </label>
                            <input
                                id="password"
                                type={isShowPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-foreground"
                            />
                            {
                                isShowPassword ? (
                                    <EyeOff onClick={() => setIsShowPassword(false)} className="absolute top-1/2 right-4" />
                                ) : (
                                    <Eye onClick={() => setIsShowPassword(true)} className="absolute top-1/2 right-4" />
                                )
                            }

                        </div>

                        {/* Confirm password */}
                        <div className="space-y-2 ">
                            <label htmlFor="confirmPass" className="block text-sm font-medium text-foreground">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPass"
                                type={"password"}
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-foreground"
                            />
                            {/* Password error */}
                            {error && <p className="text-sm text-red-500">{error}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-2 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {submitting ? "Creating Account..." : "Sign Up"}
                        </button>
                    </form>
                </div>


                <div className="px-6 py-4 border-t border-border flex flex-col gap-3">
                    <p className="text-sm text-muted-foreground text-center">
                        Already have an account?{" "}
                        <Link
                            to={"/signin"}
                            className="text-primary hover:text-primary/90 hover:underline font-medium"
                        >
                            Sign in
                        </Link>
                    </p>

                    <div className="flex items-center gap-2 w-full">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-xs text-muted-foreground">OR</span>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <button
                            className="w-12 h-12 rounded-full flex items-center justify-center border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            aria-label="Sign up with Google"
                        >
                            <FcGoogle className="w-5 h-5" />
                        </button>

                        <button
                            className="w-12 h-12 rounded-full flex items-center justify-center border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            aria-label="Sign up with GitHub"
                        >
                            <FaGithub className="w-5 h-5" />
                        </button>

                        <button
                            className="w-12 h-12 rounded-full flex items-center justify-center border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            aria-label="Sign up with Facebook"
                        >
                            <FaFacebook className="w-5 h-5 text-blue-600" />
                        </button>

                        <button
                            className="w-12 h-12 rounded-full flex items-center justify-center border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            aria-label="Sign up with Twitter/X"
                        >
                            <FaTwitter className="w-5 h-5 text-sky-500" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp