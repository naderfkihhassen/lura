import SignInForm from "./signInForm"

const SignInPage = ({ searchParams }: { searchParams: { error?: string } }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96 border border-gray-200">
      <h1 className="text-center text-2xl font-bold mb-6 text-black">Sign In to Lura</h1>

      {searchParams.error === "access_denied" && (
        <div className="p-4 mb-4 bg-yellow-50 text-yellow-700 rounded-md">
          Authentication was canceled. Please try again.
        </div>
      )}

      <SignInForm />
    </div>
  )
}

export default SignInPage

