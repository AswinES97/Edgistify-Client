import { Typography, Input, Button, Spinner } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as yup from "yup";
import lodash from "lodash";
import { Link, useNavigate } from "react-router-dom";
import { signupApi } from "../api/authApi";
import { IFormData } from "../types/types";
import { toast } from "react-toastify";
import { useState } from "react";

const SignUpPage = () => {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (data: IFormData) => {
    setDisabled(true);
    await signupApi(data)
      .then((data) => {
        toast.success(data.message);
        toast("Login to access full site");
        formik.resetForm();

        setTimeout(() => {
          navigate("/signin");
        }, 1500);
      })
      .catch((err) => {
        setTimeout(() => {
          setDisabled(false);
        }, 4000);
        toast.error(err.response.data.error[0].message);
      });
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      fullname: yup.string().trim().min(8).required("*Required"),
      email: yup.string().email("*Invalid email address").required("*Required"),
      password: yup
        .string()
        .required("*Required")
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^*-]).{8,}$/,
          { message: "*min: 8 char, 1 upper, 1 lower, 1 special " }
        ),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), ""], "*Password not match")
        .required("*Required"),
    }),
    onSubmit: async (values: IFormData, { setSubmitting }) => {
      const data: IFormData = lodash.omit(values, "confirmPassword");
      await submitHandler(data);
      setSubmitting(false);
    },
  });

  return (
    <div className="w-full h-screen flex pt-10">
      <div className="hidden lg:block w-screen h-screen bg-black"></div>
      <div className="w-screen h-screen bg-black">
        {/* Form */}
        <div className="flex justify-center h-[45rem]">
          <div className="flex w-100 mt-32 pt-5 items-center justify-center flex-col border-2 border-gray-400 rounded-xl bg-white">
            <div>
              <div className="flex justify-center gap-2">
                <Typography
                  variant="h3"
                  color="black"
                  className="text-center "
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  Sign Up
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
                      autoFocus={true}
                      type="text"
                      id="fullname"
                      size="lg"
                      label="Fullname"
                      {...formik.getFieldProps("fullname")}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      crossOrigin={undefined}
                    />
                    <em className="h-4 ml-2 text-xs text-red-800">
                      {formik.touched.fullname && formik.errors.fullname
                        ? formik.errors.fullname
                        : null}
                    </em>

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
                    <Input
                      type="password"
                      id="confirmPassword"
                      size="lg"
                      label="Confirm Password"
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      crossOrigin={undefined}
                      {...formik.getFieldProps("confirmPassword")}
                    />
                    <em className="h-4 ml-2 text-xs text-red-800">
                      {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? formik.errors.confirmPassword
                        : null}
                    </em>
                  </div>

                  <div className="flex w-24 ml-16">
                    {disabled ? (
                      <Button
                        disabled={disabled}
                        type="submit"
                        className="mt-2"
                        color="black"
                        variant="gradient"
                        fullWidth
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <Spinner
                          className="ms-2 h-4"
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        />
                      </Button>
                    ) : (
                      <Button
                        disabled={disabled}
                        type="submit"
                        className="mt-2"
                        color="black"
                        variant="gradient"
                        fullWidth
                        placeholder={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Submit
                      </Button>
                    )}
                  </div>

                  <Typography
                    color="gray"
                    className="mt-4 text-center font-normal lg:w-68 text-sm"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    Already have an account?{" "}
                    <Link
                      to="/signin"
                      className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                    >
                      Sign In
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

export default SignUpPage;
