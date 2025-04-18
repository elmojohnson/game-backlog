import { useForm, UseFormSetError } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserCredentials, UserCredentialsSchema } from "@/form-schemas/User";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router";

export default function useAccount() {
  const navigate = useNavigate();

  function signInForm() {
    return useForm<UserCredentials>({
      resolver: yupResolver(UserCredentialsSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });
  }

  async function signIn(values: UserCredentials, setError: UseFormSetError<UserCredentials>) {
    const { error } = await supabase.auth.signInWithPassword(values);

    if (error) {
      if (error.code === "invalid_credentials") {
        setError("root", {
          type: "manual",
          message: "Incorrect credentials",
        });
      } else {
        navigate("/error");
      }
    } else {
      navigate("/");
    }
  }

  return { signInForm, signIn };
}
