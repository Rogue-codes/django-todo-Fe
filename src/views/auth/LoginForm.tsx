import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../api/auth.api";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { loginUser } from "../../config/authSlice";

interface ILoginForm {
  username: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({ 
    defaultValues: { username: "", password: "" },
  });       

  const [login, { isLoading, isSuccess, data }] = useLoginMutation();

  const onSubmit = (values: ILoginForm) => {
    login({ ...values })
      .unwrap()
      .catch((e: any) => {
        console.log(e);
        enqueueSnackbar(e?.data?.message, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        loginUser({
          user: data?.user,
          access_token: data?.access,
          refresh: data?.refresh,
        })
      );
      enqueueSnackbar(`welcome ${data?.user?.username}`, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  }, [isSuccess]);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
