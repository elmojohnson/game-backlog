import { useForm, UseFormSetError } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User, UserCredentials, UserCredentialsSchema, UserSchema } from "@/form-schemas/User";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router";
import { toast } from "sonner";

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
      setError("root", {
        type: "manual",
        message: error.message,
      });
    } else {
      navigate("/");
    }
  }

  function signUpForm() {
    return useForm<User>({
      resolver: yupResolver(UserSchema),
      defaultValues: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
    });
  }

  async function signUp(values: User, setError: UseFormSetError<User>) {
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          first_name: values.first_name,
          last_name: values.last_name,
        },
      },
    });

    if (error) {
      console.log(error.stack);
      if (error.code === "user_already_exists") {
        setError("email", {
          message: error.message,
        });
      } else if (error.code === "weak_password") {
        setError("password", {
          message: error.message,
        });
      } else {
        setError("root", {
          type: "manual",
          message: error.message,
        });
      }
    } else {
      toast.success("Account created!");
      navigate("/");
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("There was an error signing out. Please try again.");
    } else {
      navigate("/account/sign-in");
    }
  }

  return { signInForm, signIn, signUpForm, signUp, signOut };
}
