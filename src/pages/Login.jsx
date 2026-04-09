import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import AuthForm from "../components/AuthForm";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    navigate("/dashboard");
  };

  return <AuthForm mode="login" onSubmit={handleSubmit} />;
}
