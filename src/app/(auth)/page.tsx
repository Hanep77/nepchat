import AuthForm from "./components/authform";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <p className="text-lg">Welcome to NepChat</p>
      <h4 className="text-2xl font-semibold mb-5">Let's sign in to your account</h4>
      <AuthForm />
    </div>
  );
}
