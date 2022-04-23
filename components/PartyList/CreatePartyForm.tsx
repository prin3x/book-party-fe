import { useRouter } from "next/router";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  title: string;
  capacity: number;
  startDate: string;
  duration: number;
};

type Props = {};

function CreatePartyForm({}: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    router.push("/");
  };


  return (
    <div className="w-screen h-screen min-h-full">
      <div className="inner-div p-5 flex flex-col items-center">
        <div className="form-container">
          <div className="block p-6 rounded-lg shadow-lg max-w-sm">
            <div className="logo-container text-center">
              <div className="text-6xl font-party text-black cursor-pointer text-center my-10">
                Lets&apos;t Party!
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-6">
                <label className="form-label inline-block mb-2 text-gray-6 w-full ">
                  PARTY TITLE
                  <input
                    {...register("title", { required: true })}
                    type="title"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Enter Party Title"
                  />
                </label>
              </div>
              <div className="flex justify-center">
                <div className="mb-3 w-full">
                  <label className="form-label inline-block mb-2 text-gray-700 w-full">
                    Capacity
                    <input
                      {...register("capacity", { required: true })}
                      type="number"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Capacity"
                    />
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="mt-3 w-full text-xl px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePartyForm;
