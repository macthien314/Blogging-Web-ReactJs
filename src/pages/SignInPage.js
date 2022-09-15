import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import Field from "../components/field/Field";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { useAuth } from "../contexts/auth-context";
import AuthenticationPage from "./AuthenticationPage";

//form
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-app/firebase-config";
import InputPasswordToggle from "../components/input/InputPasswordToggle";

const schema = yup.object({
    
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email address"),
    password: yup
      .string()
      .min(8, "Your password must be at least 8 characters or greater")
      .required("Please enter your password"),
  });

const SignInPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);


  const {userInfo} = useAuth();
  const navigate = useNavigate();
  useEffect (()=>{
    document.title = 'Login Page';
    //? email kiểm tra có userInfo k có thì trả về, k có ? thì khi userInfo rỗng .eamil sẽ undefined
      if(userInfo?.email){
          navigate('/');
      }
  },[]);

  const handleSignIn = async (values) => {
    if(!isValid) return
     await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate('/');
  };

  return (
    <AuthenticationPage>
      <form className="form" onSubmit={handleSubmit(handleSignIn)}>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            name="email"
            type="text"
            placeholder="Enter your email address"
            control={control}
          />
        </Field>

        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">You have not had an account? <NavLink to={'/sign-up'}>Register an account</NavLink></div>
        <Button
          
          style={{  margin: "0 auto", width:'100%'}}
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Login
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
