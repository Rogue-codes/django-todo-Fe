import { useForm } from "react-hook-form";
import { useLoginMutation, useRegisterMutation } from "../../api/auth.api";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";

interface IRegisterForm {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
  password: string;
}
export default function RegisterForm({
  setActiveTab,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegisterForm>({
    defaultValues: {
      email: "",
      username: "",
      first_name: "",
      last_name: "",
      address: "",
      phone_number: "",
      password: "",
    },
  });

  const [register_, { isLoading, isSuccess, data }] = useRegisterMutation();

  const onSubmit = (values: IRegisterForm) => {
    register_({ ...values })
      .unwrap()
      .catch((e: any) => {
        console.log(e);
        enqueueSnackbar(e?.data?.message, {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      });
    reset();
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(data?.message, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      setActiveTab(0);
    }
  }, [isSuccess]);

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* First Name */}
        <div>
          <label className="block font-medium">First Name</label>
          <input
            type="text"
            {...register("first_name", { required: "First name is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.first_name && (
            <p className="text-red-500">{errors.first_name.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block font-medium">Last Name</label>
          <input
            type="text"
            {...register("last_name", { required: "Last name is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.last_name && (
            <p className="text-red-500">{errors.last_name.message}</p>
          )}
        </div>

        {/* Username */}
        <div>
          <label className="block font-medium">Username</label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            type="tel"
            {...register("phone_number", {
              required: "Phone number is required",
            })}
            className="w-full border p-2 rounded"
          />
          {errors.phone_number && (
            <p className="text-red-500">{errors.phone_number.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium">Address</label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full border p-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
