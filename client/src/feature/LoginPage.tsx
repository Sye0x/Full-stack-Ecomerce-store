import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../components/ui/field";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { Input } from "../components/ui/input";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
//react hook form
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    alert("Login Sucess");
    reset();
  };

  return (
    <div className=" flex min-h-screen items-center justify-center bg-muted/30 p-5">
      <Card className="z-10 w-full max-w-lg shadow-xl">
        <CardHeader className="mt-2 flex flex-col">
          <CardTitle className="flex items-center gap-3 text-3xl font-semibold">
            Login
          </CardTitle>

          <CardDescription className="mt-1 text-[1rem]">
            Welcome Back
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet className="mt-4">
              <FieldGroup className="space-y-2">
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>

                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="email"
                      placeholder="someone@example.com"
                      className="pl-10"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <FieldError>{errors.email.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>

                  <div className="relative">
                    <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      className="pr-10 pl-10"
                      {...register("password")}
                    />

                    <button
                      type="button"
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <FieldError>{errors.password.message}</FieldError>
                  )}
                </Field>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Loading..." : "Login"}
                </Button>

                <div className="flex items-center justify-center gap-1">
                  <label>Don't have an account?</label>

                  <Link
                    to="/register"
                    className="text-[1rem] font-semibold underline-offset-4 hover:underline"
                  >
                    Sign Up
                  </Link>
                </div>
              </FieldGroup>
            </FieldSet>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
