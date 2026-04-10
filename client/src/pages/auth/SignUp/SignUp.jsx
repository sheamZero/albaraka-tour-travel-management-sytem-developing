import { useLocation, useNavigate } from "react-router-dom";
import SignUpForm from "../../../components/auth/SignUpForm";
import SocialLogin from "../../../components/auth/SocialLogin";
import { successAction } from "../../../utils/swal";


const SignUp = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const handleSuccess = () => {
    successAction("Account created successfully!")
    navigate(location.state || "/")
  }

  return (
    <section className="h-screen bg-secondary/5 flex items-center justify-center px-4 py-6">
      <div className="w-full py-8 max-w-lg bg-card rounded-lg shadow-lg overflow-hidden border border-border">
        <SignUpForm onSuccess={handleSuccess} />
        <SocialLogin />
      </div>
    </section>
  );
};

export default SignUp;