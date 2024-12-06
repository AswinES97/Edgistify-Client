import { Typography, Input, Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { signinApi } from "../api/auth";

export const SigninForm = () => {
  const navigate = useNavigate();

  const submitHandler = async (formData: any) => {
    await signinApi(formData)
      .then((data) => {
        localStorage.setItem("token", data.token);
        toast.success(data.message);

        setTimeout(() => {
            navigate("/")
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.error[0].message);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("*Invalid email address").required("*Required"),
      password: yup
        .string()
        .required("*Required")
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^*-]).{8,}$/,
          { message: "*min: 8 char, 1 upper, 1 lower, 1 special " }
        ),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await submitHandler(values);
      setSubmitting(false);
    },
  });

  return (
    <div className="w-full h-screen flex">
      <div className="w-screen h-screen bg-black"></div>
      <div className="w-screen h-screen bg-black">
        {/* Form */}
        <div className="flex justify-center h-[45rem]">
          <div className="flex w-100 mt-32 pt-5 items-center justify-center flex-col border-2 border-gray-400 rounded-xl bg-white">
            <div>
              <div className="flex justify-center gap-2">
                <Typography
                  variant="h3"
                  color="blue"
                  className="text-center "
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Sign In
                </Typography>
              </div>
            </div>
            <div className="flex justify-center pt-8">
              <form
                onSubmit={formik.handleSubmit}
                className=" ml-auto mr-auto 2 w-100 "
              >
                <div className="px-16">
                  <div className="flex flex-col gap-1">
                    <Input
                      type="text"
                      id="email"
                      size="lg"
                      label="Email"
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      crossOrigin={undefined}
                      {...formik.getFieldProps("email")}
                    />
                    <em className="h-4 ml-2 text-xs text-red-800">
                      {formik.touched.email && formik.errors.email
                        ? formik.errors.email
                        : null}
                    </em>

                    <Input
                      type="password"
                      id="password"
                      size="lg"
                      label="Password"
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      crossOrigin={undefined}
                      {...formik.getFieldProps("password")}
                    />
                    <em className="h-4 ml-2 text-xs text-red-800">
                      {formik.touched.password && formik.errors.password
                        ? formik.errors.password
                        : null}
                    </em>
                  </div>

                  <div className="flex w-24 ml-44">
                    <Button
                      type="submit"
                      className="mt-2"
                      color="blue"
                      variant="gradient"
                      fullWidth
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      Submit
                    </Button>
                  </div>
                  <Typography
                    color="gray"
                    className="mt-4 text-center font-normal lg:w-68"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                    >
                      Sign Up
                    </Link>
                  </Typography>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
