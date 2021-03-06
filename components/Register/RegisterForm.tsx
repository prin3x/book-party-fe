import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import useUserAuthentication from "../../hooks/useUserAuthentication";
import PolicyModal from "../Login/PolicyModal";

type Inputs = {
  username: string;
  password: string;
  passwordConfirmation: string;
};

type Props = {};

function RegisterForm({}: Props) {
  const router = useRouter();
  const { onRegister } = useUserAuthentication();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await onRegister(data);
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  function onCheckPolicy(_isCheck: boolean) {
    if (!_isCheck) {
      setIsOpenModal(true);
    }

    setIsChecked(false);
  }

  function onConfirmConsent() {
    setIsOpenModal(false);
    setIsChecked(true);
  }
  function onDeclineConsent() {
    setIsOpenModal(false);
    setIsChecked(false);
  }

  return (
    <div className="w-screen h-screen min-h-full bg-white">
      <div className="inner-div p-5 flex flex-col items-center">
        <div className="form-container">
          <div className="block p-6 rounded-lg shadow-lg max-w-xl">
            <div className="logo-container text-center">
              <div className="text-9xl font-bold tracking-wider">REGISTER</div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-6">
                <label className="form-label inline-block mb-2 text-gray-6 w-full">
                  Username
                  <input
                    {...register("username", {
                      required: "Username is required!",
                    })}
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </label>
                {errors.username && (
                  <p style={{ color: "red" }}>{errors.username.message}</p>
                )}
              </div>
              <div className="form-group mb-6">
                <label className="form-label inline-block mb-2 text-gray-700 w-full">
                  Password
                  <input
                    {...register("password", {
                      required: "Password is required!",
                    })}
                    type="password"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </label>
                {errors.password && (
                  <p style={{ color: "red" }}>{errors.password.message}</p>
                )}
              </div>
              <div className="form-group mb-6">
                <label className="form-label inline-block mb-2 text-gray-700 w-full">
                  Confirm Password
                  <input
                    {...register("passwordConfirmation", {
                      required: "Please fill confirm password!",
                      validate: {
                        matchesPreviousPassword: (value) => {
                          const { password } = getValues();
                          return (
                            password === value || "Passwords is not matched!"
                          );
                        },
                      },
                    })}
                    type="password"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </label>
                {errors.passwordConfirmation && (
                  <p style={{ color: "red" }}>
                    {errors.passwordConfirmation.message}
                  </p>
                )}
              </div>
              <div className="flex items-center">
                <label className="block text-sm text-gray-900 flex items-center">
                  <input
                    type="checkbox"
                    className="transition duration-200  align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    onClick={() => onCheckPolicy(isChecked)}
                    checked={isChecked}
                  />
                  Accept Cookies and Policy
                </label>
              </div>
              <button
                type="submit"
                className="mt-3 w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
      <PolicyModal
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        onConfirm={onConfirmConsent}
        onDecline={onDeclineConsent}
      />
    </div>
  );
}

export default RegisterForm;
