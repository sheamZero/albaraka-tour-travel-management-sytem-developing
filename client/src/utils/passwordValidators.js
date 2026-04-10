export const validatePassword = (password, confirmPassword) => {

  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/

  if (!regex.test(password)) {
    throw new Error(
      "Password must contain uppercase, lowercase and special character"
    )
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match")
  }
}