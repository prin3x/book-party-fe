import { useRouter } from "next/router";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { formatISO9075 } from "date-fns";
import { ICreatePartyModel } from "../../services/party/party.model";
import { _createParty } from "../../services/party/party.service";
import { SaveIcon } from "@heroicons/react/outline";
import LoadingButton from "@mui/lab/LoadingButton";
import Image from "next/image";

type Inputs = {
  title: string;
  capacity: number;
  startDate: string;
  startTime: string;
  description: string;
  duration: number;
  image: any;
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
  const [dateTime, setDateTime] = React.useState<Date | null>(new Date());
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [base64Image, setBase64Image] = React.useState<string>("");
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsLoading(true)
    if (!dateTime) return;
    const set = {} as ICreatePartyModel;
    set.title = data.title;
    set.capacity = data.capacity;
    set.description = data.description;
    set.duration = data.duration;
    set.startDate = formatISO9075(new Date(dateTime));
    set.image = data.image[0];

    try {
      await _createParty(set);
      router.push("/");
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false)
    }
  };

  const onChangeDateTime = (date: Date | null) => {
    if (!date) return;
    const newDate = new Date(date);
    setDateTime(newDate);
  };

  const onUploadFile = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    let getImageBase64 = await getBase64(file);
    setBase64Image(getImageBase64);
  };

  function getBase64(img: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  return (
    <div className="w-screen h-screen min-h-full">
      <div className="inner-div p-5 flex flex-col items-center">
        <div className="form-container">
          <div className="block p-6 rounded-lg shadow-lg max-w-sm">
            <div className="logo-container text-center">
              <div className="text-6xl font-party text-black cursor-pointer text-center my-10">
                Let&apos;s Party!
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-6">
                <div className="flex justify-center mt-8">
                  <div className="mb-8">
                    <label className="form-label inline-block mb-2 text-gray-6 w-full ">
                      Upload Party Cover (jpg,png,jpeg,gif)
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col w-full h-36 border-2 border-dashed hover:bg-gray-100 hover:border-black">
                        <div
                          className={`flex flex-col items-center justify-center cursor-pointer ${
                            base64Image ? "" : "pt-7"
                          }`}
                        >
                          {base64Image && (
                            <Image
                              src={base64Image || ""}
                              alt="example"
                              className="h-36 w-full"
                              height={140}
                              width={250}
                            />
                          )}
                          <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Select a cover
                          </p>
                        </div>
                        <input
                          {...register("image", { required: true })}
                          type="file"
                          className="opacity-0 cursor-pointer"
                          onChange={onUploadFile}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <label className="form-label inline-block mb-2 text-gray-6 w-full ">
                  PARTY TITLE
                  <input
                    {...register("title", { required: true })}
                    type="title"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black hover:border-black focus:outline-none"
                    placeholder="Enter Party Title"
                  />
                </label>
              </div>
              <div className="flex justify-center">
                <div className="mb-3 w-full">
                  <label className="form-label inline-block mb-2 text-gray-700 w-full">
                    Description
                    <input
                      {...register("description", { required: true })}
                      type="title"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black hover:border-black focus:outline-none"
                      placeholder="Enter Party Short Description"
                    />
                  </label>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="mb-3 w-full">
                  <label className="form-label inline-block mb-2 text-gray-700 w-full">
                    Capacity
                    <input
                      {...register("capacity", { required: true })}
                      type="number"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black hover:border-black focus:outline-none"
                      placeholder="Capacity"
                    />
                  </label>
                </div>
              </div>
              <label className="form-label inline-block mb-0 text-gray-700 w-full">
                Date and Time
              </label>
              <div className="flex mb-3 w-full">
                <div className="flex-none">
                  <MobileDatePicker
                    {...register("startDate")}
                    inputFormat="MM/dd/yyyy"
                    value={dateTime}
                    onChange={onChangeDateTime}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div className="ml-3">
                  <TimePicker
                    {...register("startTime")}
                    value={dateTime}
                    onChange={onChangeDateTime}
                    renderInput={(params) => {
                      return <TextField {...params} />;
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <div className="mb-3 w-full">
                  <label className="form-label inline-block mb-2 text-gray-700 w-full">
                    Duration
                    <input
                      {...register("duration", { required: true })}
                      type="number"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black hover:border-black focus:outline-none"
                      placeholder="Capacity"
                    />
                  </label>
                </div>
              </div>
              <LoadingButton
                type="submit"
                className="mt-3 w-full text-xl px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                loading={isLoading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                sx={{
                  backgroundColor: "rgb(255, 0, 0)",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "rgb(155, 0, 0)",
                  },
                }}
              >
                Create
              </LoadingButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePartyForm;
