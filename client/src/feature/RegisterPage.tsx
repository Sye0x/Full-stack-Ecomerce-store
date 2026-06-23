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
import { Link } from "@tanstack/react-router";
import { Input } from "../components/ui/input";

import { Mail, Lock, Eye, EyeOff, User, Phone, MapPin } from "lucide-react";

import { useState } from "react";
import { z } from "zod";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name is too long")
      .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\d{11}$/, "Phone number must contain exactly 11 digits"),

    address: z
      .string()
      .min(1, "Address is required")
      .min(5, "Address is too short")
      .max(200, "Address is too long"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&#^()_\-+=<>./[\]{}|\\]/,
        "Password must contain at least one special character",
      ),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    console.log(data);

    alert("Registration Successful");

    reset();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-5">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold">Register</CardTitle>

          <CardDescription>Create a new account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet>
              <FieldGroup className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="pl-10"
                      {...register("name")}
                    />
                  </div>

                  {errors.name && (
                    <FieldError>{errors.name.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="pl-10"
                      {...register("email")}
                    />
                  </div>

                  {errors.email && (
                    <FieldError>{errors.email.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="phone">Phone Number</FieldLabel>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="phone"
                      placeholder="03123456789"
                      className="pl-10"
                      {...register("phone")}
                    />
                  </div>

                  {errors.phone && (
                    <FieldError>{errors.phone.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="address">Address</FieldLabel>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="address"
                      placeholder="Street, City"
                      className="pl-10"
                      {...register("address")}
                    />
                  </div>

                  {errors.address && (
                    <FieldError>{errors.address.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="pl-10 pr-10"
                      {...register("password")}
                    />

                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword((prev) => !prev)}
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

                <Field>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      className="pl-10 pr-10"
                      {...register("confirmPassword")}
                    />

                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <FieldError>{errors.confirmPassword.message}</FieldError>
                  )}
                </Field>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>

                <div className="flex justify-center gap-1 text-sm">
                  <span>Already have an account?</span>

                  <Link to="/" className="font-semibold hover:underline">
                    Sign In
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
