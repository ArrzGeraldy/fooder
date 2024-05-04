import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(3, "Password at least 3 characters"),
});
const SignIn = () => {
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const authContext = useAuth();
  const setAuth = authContext ? authContext.setAuth : () => {};
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (response.ok) {
      setAuth({
        user: json.data.user,
        accessToken: json.data.accessToken,
      });
      // console.log("auth: ", authContext?.auth);
      navigate("/");
    }
    if (json.error?.message) setError(json.error.message);
    setIsLoading(false);
  };

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await login(values.email, values.password);
  };
  return (
    <section className="w-full text-[#242424]">
      <div className="flex w-8/12 md:w-1/2 lg:w-8/12 flex-col mx-auto ">
        <h1 className="text-3xl font-semibold text-center mb-4">Login</h1>
        {error && (
          <div className="bg-red-300 py-2 rounded text-center text-red-800 mb-4">
            {error}
          </div>
        )}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John@gmail.com"
                      {...field}
                      className="border border-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
                      {...field}
                      type="password"
                      className="border border-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} className="w-full mt-4">
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Form>
        <p className="text-sm mt-4">
          Need Account ?{" "}
          <Link to={"/sign-up"} className="text-sky-600 underline">
            Sign up here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignIn;
