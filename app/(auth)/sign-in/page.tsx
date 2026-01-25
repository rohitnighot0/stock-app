'use client'
import React from 'react'
import InputField from "@/components/forms/InputField";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";

const SignIn = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onBlur'
    });
    return (
        <>
            <h1 className="form-title">Log In Your Account</h1>
            <div className="space-y-5">
                <InputField
                    name="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    register={register}
                    error={errors.email}
                    validation={{required: 'Email is Required', pattern: {value: /^\S+@\S+$/i}}}
                />
                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    register={register}
                    error={errors.password}
                    validation={{required: 'Password is Required', min_length: 8}}
                />
                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
                <FooterLink
                    text="Create an account?"
                    linkText="Sign Up"
                    href="/sign-up"
                />
            </div>
        </>

    )
}
export default SignIn
