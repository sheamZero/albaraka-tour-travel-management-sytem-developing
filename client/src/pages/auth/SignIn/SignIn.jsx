import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault()
    console.log("Email:", email)
    console.log("Password:", password)
  }

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
              type="submit"
              className="w-full py-2 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition"
            >
              Sign in
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

          <button className="w-full py-2 px-4 border border-input rounded-md bg-background text-foreground font-medium hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition flex items-center justify-center gap-2">
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