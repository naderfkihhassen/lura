import Link from "next/link"
import SignUpForm from "./signupForm"

const SignUpPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col justify-center items-center ">
      <h1 className="text-center text-2xl font-bold mb-4">Sign Up for Lura</h1>
      <SignUpForm />
      <div className="flex justify-between text-sm mt-4">
        <p>Already have an account?</p>
        <Link className="underline ml-2" href={"/auth/signin"}>
          Sign In
        </Link>
      </div>
    </div>
  )
}

export default SignUpPage

