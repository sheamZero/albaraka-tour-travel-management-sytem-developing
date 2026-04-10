import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { validatePassword } from "../../utils/passwordValidators";
import { uploadImage } from "../../utils/imageUpload";
import axios from "axios";


const SignUpForm = ({ onSuccess }) => {
    const { signUpWithEmailPass, updateUserProfile, setUser } = useAuth();
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [photo, setPhoto] = useState(null)


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const resetForm = () => {
        setForm({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
        setPhoto(null);
        setError("");
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("")
        console.log(form)
        try {

            validatePassword(form.password, form.confirmPassword)

            if (!photo) {
                throw new Error("Please upload profile photo")
            }

            const imageUrl = await uploadImage(photo)

            const result = await signUpWithEmailPass(form.email, form.password)

            const user = result.user

            await updateUserProfile(form.name, imageUrl)

            setUser({
                ...user,
                displayName: form.name,
                photoURL: imageUrl
            })

            const response = await axios.post("http://localhost:5000/users", {
                name: form.name,
                email: form.email,
                photoURL: imageUrl,
                role: "user",
                createdAt: new Date()
            })

            if (response.data?.acknowledged) {
                resetForm();
                onSuccess();
            }


        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="px-6 py-5 border-b border-border">
                <h2 className="text-xl font-semibold text-center text-foreground">
                    Create an Account
                </h2>
            </div>

            <div className="px-6 py-4">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-foreground">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Sheam Hossain"
                            name="name"
                            required
                            value={form.name}
                            onChange={handleChange}
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
                            name="email"
                            placeholder="m@example.com"
                            required
                            value={form.email}
                            onChange={handleChange}
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
                            type={showPassword ? "text" : "password"}
                            name="password"
                            required
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-foreground"
                        />
                        {
                            showPassword ? (
                                <EyeOff onClick={() => setShowPassword(false)} className="absolute top-1/2 right-4" />
                            ) : (
                                <Eye onClick={() => setShowPassword(true)} className="absolute top-1/2 right-4" />
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
                            name="confirmPassword"
                            required
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-foreground"
                        />
                        {/* Password error */}
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default SignUpForm;