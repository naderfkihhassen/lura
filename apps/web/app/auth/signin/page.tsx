import SignInForm from "./signInForm"

const SignInPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96 border border-gray-200">
      <h1 className="text-center text-2xl font-bold mb-6 text-black">Sign In to Lura</h1>
      <SignInForm />
    </div>
  )
}

export default SignInPage

