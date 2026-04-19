import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { errorAction, successAction } from "../../../utils/swal";
import { useEffect } from "react";
import generateToken from "../../../utils/generateToken";



const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { signInWithGoogle, user, signInWithEmailPass } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("locatino ", location)


  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await signInWithEmailPass(email, password);

      if (result?.user?.email) {
        const userEmail = result.user.email;
        console.log("result and email", result, email)

        await generateToken(userEmail);

        // get role
        const { data } = await axiosPublic.post("/role", { email: userEmail })
        console.log(data.role);

        successAction("Logged in successfully!");

        // const redirectPath = location.state?.from?.pathname || "/";

        let redirectPath;

        if (location.state?.from?.pathname) {
          redirectPath = location.state?.from?.pathname;
        } else {
          if (data.role === "admin") {
            redirectPath = "/dashboard/admin";
          } else {
            redirectPath = "/";
          }
        }

        // Single navigate call
        navigate(redirectPath, { replace: true, state: {} });
        console.log("redirect path", redirectPath);

      }
    } catch (err) {
      console.log("Login error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();

      if (result?.user?.email) {
        const userEmail = result.user.email;
        console.log("Google Sign In Response -->>", result);

        // Prepare user data for database
        const userData = {
          name: result.user?.displayName,
          email: userEmail,
          photoURL: result.user?.photoURL,
          role: "user",
          createdAt: new Date()
        };

        console.log("User Data -->>", userData);

        // Send user data to server
        const response = await axiosPublic.post("/users/google", userData);
        console.log("Server Response google -->>", response.data);

        // Generate token (similar to email login)
        await generateToken(userEmail);

        // Get role
        const { data } = await axiosPublic.post("/role", { email: userEmail });
        console.log(data.role);

        successAction("Logged in successfully!");

        // Set redirect path based on role

        let redirectPath;

        if (location.state?.from?.pathname) {
          redirectPath = location.state?.from?.pathname;
        } else {
          if (data.role === "admin") {
            redirectPath = "/dashboard/admin";
          } else {
            redirectPath = "/";
          }
        }

        // Single navigate call
        navigate(redirectPath, { replace: true, state: {} });
        console.log("redirect path", redirectPath);
      }
    } catch (error) {
      console.error("Google Sign In Error -->>", error);
      errorAction(error.message || "Google login failed!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate(location.state?.from?.pathname || "/", { replace: true });
    }
  }, [user, navigate, location]);

  return (
    <section className="h-screen bg-secondary/5 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-card py-10 rounded-lg shadow-lg overflow-hidden border border-border">

        <div className="px-6 py-5 border-b border-border">
          <h2 className="text-xl font-semibold text-center text-foreground">
            Welcome Back
          </h2>
        </div>


        <div className="px-6 py-4">
          <form onSubmit={handleSignIn} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="sheam@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-foreground placeholder:text-muted-foreground"
              />

            </div>

            {/* Password */}
            <div className="space-y-2 relative">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>

                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>
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

            <button
              disabled={loading}
              type="submit"
              className="w-full py-2 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>


        <div className="px-6 py-4 border-t border-border flex flex-col gap-3">
          <p className="text-sm text-muted-foreground text-center">
            Don't have an account?{" "}
            <Link
              to={"/signup"}
              className="text-primary hover:text-primary/90 hover:underline font-medium"
            >
              Sign up
            </Link>
            {/* <a href="#" className="text-primary hover:text-primary/90 hover:underline font-medium">
              Sign up
            </a> */}
          </p>

          <div className="flex items-center gap-2 w-full">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 px-4 border border-input rounded-md bg-background text-foreground font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition flex items-center justify-center gap-2"
            disabled={loading}
          >
            <FcGoogle className="w-5 h-5" />
            <span>Login with Google</span>
          </button>

          <button className="w-full py-2 px-4 border border-input rounded-md bg-background text-foreground font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition flex items-center justify-center gap-2">
            <FaGithub className="w-5 h-5" />
            <span>Login with GitHub</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default SignIn