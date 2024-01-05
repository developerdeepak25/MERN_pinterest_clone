import React, { useEffect, useRef, useState } from "react";
import UploadSvg from "../Svgs/UploadSvg";

const ImgUploader = ({ setFile }) => {
  const inputRef = useRef(null);
  const previewImg = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);

  const selectfile = () => {
    inputRef.current.click();
  };
  const getImageHeight = () => {
    const height = previewImg.current.offsetHeight;
    setImageHeight(height);
    // console.log(height);
  };
  
  const onDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file.type.startsWith("image/")) {
     
      setFile(file);
      setSelectedFile(file);
      console.log("drop", file);
    } else{
      setFile(null);
      setSelectedFile(null);
      console.log('dropped file is not image');

    }
  };
  const onDragOver = (event) => {
    event.preventDefault();
    console.log("dragover");
  };
  //   useEffect(() => {
  //     // console.log(selectedFile);
  //   }, [selectedFile]);
  return (
    <>
      <div
        className={`img-Uploader bg-[#e9e9e9]  w-[23rem] ${
          imageHeight && selectedFile ? `h-[${imageHeight}]` : "h-[27rem]"
        }  rounded-3xl border-dashed border-[#dadada]  hover:border-[#929292] border-2 cursor-pointer overflow-hidden relative`}
        onClick={selectfile}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <div className="flex items-center flex-col justify-center h-full pointer-events-none ">
          {selectedFile ? (
            <img
              className=" w-full "
              ref={previewImg}
              src={URL.createObjectURL(selectedFile)}
              alt="upload-img-preview"
              onLoad={getImageHeight}
            />
          ) : (
            <>
              <UploadSvg width={25} />
              <h3 className="pointer-events-none text-center break-words  max-w-[220px]">
                Choose a file or drag and drop it here
              </h3>
            </>
          )}
        </div>
        {selectedFile && (
          <div className="flex justify-center items-center flex-col w-full h-full z-20 bg-[#ffffff8f] absolute opacity-0  hover:opacity-100 top-0">
            <UploadSvg width={25} />
            <h3 className="pointer-events-none text-center break-words  max-w-[220px] font-medium">
              Choose Another
            </h3>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          name="upload_file"
          onChange={(e) => {
            setSelectedFile(e.target.files[0]);
            setFile(e.target.files[0]);
          }}
          hidden
          ref={inputRef}
          multiple={false}
        />
      </div>
    </>
  );
};

export default ImgUploader;
