import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import AuthForm from "../components/AuthForm";

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = async ({ email, password }) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
    navigate("/dashboard");
  };

  return <AuthForm mode="signup" onSubmit={handleSubmit} />;
}
