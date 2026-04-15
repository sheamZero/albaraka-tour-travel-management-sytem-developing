
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook, FaTwitter } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const SocialLogin = ({ onSuccess }) => {
    const { signInWithGoogle, setUser } = useAuth();
    const axiosPublic = useAxiosPublic();

    const handleGoogleLogin = async () => {
        const result = await signInWithGoogle();
        setUser(result.user);

        const userData = {
            name: result.user?.displayName,
            email: result.user?.email,
            photoURL: result.user?.photoURL,
            role: "user",
            createdAt: new Date()
        };
        console.log("Google Sign In Response -->>", result);
        console.log("User Data -->>", userData);

        if (result.user?.email) {
            const response = await axiosPublic.post("/users/google", userData);
            console.log("Server Response google -->>", response.data);
            onSuccess();

        }
    }

    return (
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
                    onClick={handleGoogleLogin}
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
    );
};

export default SocialLogin;