import React, { useEffect, useRef, useState } from "react";
import "./Create.scss";
import ImgUploader from "../../components/ImgUploader/ImgUploader";
import ErrorSvg from "../../components/Svgs/ErrorSvg";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/Inputs/InputField";
import toast from "react-hot-toast";
import AxiosInstance from "../../AxiosInstance/AxiosInstance";

const Create = () => {
  const [file, setFile] = useState(null);
  const [fileMetadata, setFileMetaData] = useState({
    pinTitle: "",
    pinDescription: "",
  });
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate();
  const [underUpload, setUnderUpload] = useState(false);
  const container = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFileMetaData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadHandler = async () => {
    try {
      setUnderUpload(true);
      if (!file) {
        setErrorMsg("Please select a file.");
        return;
      }

      if (!fileMetadata.pinTitle || !fileMetadata.pinDescription) {
        setErrorMsg("Title and Description are required.");
        return;
      }
      const formData = new FormData();
      // console.log(formData);

      //appendin img file
      formData.append("upload_file", file);

      //appending image meta data or additionals
      formData.append("pinTitle", fileMetadata.pinTitle);
      formData.append("pinDescription", fileMetadata.pinDescription);

      const response = await AxiosInstance.post(
        `/image/upload`,
        formData
      );
      // const resJson = await response.json();

      if (response.status === 200) {
        // console.log("Upload.js", resJson);
        console.log(response.data.message);
        toast.success('post created successfully')
        navigate("/");
      } else {
        toast.error('post creation failed: please check your connection')
        console.log(response.data.message);
      }
    } catch (error) {
      toast.error("Oops! Something went wrong.");
      console.log("Failed to upload", error);
    } finally {
      setUnderUpload(false);
    }
  };
  const preventDefault = (event) => {
    event.preventDefault();
    // console.log("checking");
  };
  useEffect(() => {
    // console.log(file);
    // console.log(fileMetadata);
    console.log(underUpload);
  }, [underUpload]);

  return (
    <div
      className="w-full bg-slate-50  create-wrapper minus-nav-100vh flex flex-col"
      ref={container}
      onDrop={preventDefault}
      onDragOver={preventDefault}
    >
      <div className="pin-creator bg-white  rounded-2xl  mx-auto max-sm:mx-0 mt-12 max-sm:mt-0 max-sm:w-full max-sm:h-auto max-sm:pb-20 max-sm:flex max-sm:flex-col max-sm:rounded-none">
        {/* <FileUpload/> */}
        <div className="pin-form  m-12 max-sm:m-5 flex gap-10 max-sm:gap-5 max-sm:flex-col ">
          <div className="upload-field">
            <ImgUploader setFile={(selectedFile) => setFile(selectedFile)} />
          </div>
          <div className="pin-detls-inputs mt-1 w-[36rem] max-sm:w-auto gap-6 flex flex-col max-sm:gap-3">
            {/* <label
              htmlFor="pinTitle"
              className="flex flex-col text-[#111111] text-sm gap-2"
            >
              Title
              <input
                type="text"
                name="pinTitle"
                id="pinTitle"
                className="border-2 border-[#cdcdcd] text-base px-4 py-2 rounded-xl"
                onChange={handleChange}
                // disabled
              />
            </label> */}
            <InputField
              name={"pinTitle"}
              id={"pinTitle"}
              handleChange={handleChange}
              label={"Title"}
            />
            <label
              htmlFor="pinDesc"
              className="flex flex-col text-[#111111] text-sm gap-2"
            >
              Description
              <textarea
                type="text"
                name="pinDescription"
                id="pinDesc"
                rows={6}
                className="border-2 border-[#cdcdcd] text-base px-4 py-2 rounded-xl resize-none "
                onChange={handleChange}
              />
            </label>
            <div className="pin-prime-btn flex">
              <button disabled={underUpload} onClick={uploadHandler}>
                Publish
              </button>
            </div>
            {errorMsg && (
              <div className="text-[#d93025] text-sm flex items-center gap-2 mx-1">
                <ErrorSvg height={15} /> {errorMsg}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    // <div >
    //   <input
    //     type="file"
    //     name="upload_file"
    //     onChange={(e) => setFile(e.target.files[0])}
    //   />
    //   <button onClick={uploadHandler}>upload</button>
    // </div>
  );
};

export default Create;
