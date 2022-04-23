import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IUserAuthen, IUserInformation } from "../../services/auth/auth.model";
import { _userLoginWebsite } from "../../services/auth/auth.service";
import useUserAuthentication from "../../hooks/useUserAuthentication";
import PolicyModal from "./PolicyModal";
import Link from "next/link";

type Inputs = {
  username: string;
  password: string;
};

type Props = {};

function LoginForm({}: Props) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { onLogin } = useUserAuthentication();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: IUserAuthen) => {
    await onLogin(data);
  };

  function onCheckPolicy(_isCheck: boolean) {
    if (!_isCheck && !isOpenModal) {
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
    <div className="bg-concert w-screen h-screen min-h-full bg-white">
      <div className="inner-div p-5 flex flex-col items-center">
        <div className="form-container bg-white rounded-xl shadow-xl max-w-sm">
          <div className="block p-6 ">
            <div className="logo-container text-center">
              <div className="text-9xl font-bold tracking-wider">PARTY</div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-6">
                <label className="form-label inline-block mb-2 text-gray-6 w-full">
                  Enter Email or Username
                  <input
                    {...register("username", { required: true })}
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Enter Username"
                  />
                </label>
              </div>
              <div className="form-group mb-6">
                <label className="form-label inline-block mb-2 text-gray-700 w-full">
                  Password
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </label>
              </div>
              <div className="flex items-center">
                <label className="block text-sm text-gray-900 flex items-center">
                  <input
                    type="checkbox"
                    className="transition duration-200  align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  />
                  Remember me
                </label>
              </div>
              <div className="flex items-center">
                <label className="block text-sm text-gray-900 flex items-center">
                  <input
                    type="checkbox"
                    className="transition duration-200  align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    checked={isChecked}
                    onClick={() => onCheckPolicy(isChecked)}
                  />
                  Accept Cookies and Policy
                </label>
              </div>
              <button
                type="submit"
                className="mt-3 w-full text-xl px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Login
              </button>
              <Link href="/register" passHref>
                <button
                  className="mt-3 w-full text-xl px-6 py-2.5 bg-gray-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-600 hover:shadow-lg focus:bg-gray-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-lime-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Register
                </button>
              </Link>
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

export default LoginForm;
