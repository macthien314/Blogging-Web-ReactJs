import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";

export default function useFirebaseImage(setValue, getValues ,imageName = null, cb = null){
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState("");
    if(!setValue || !getValues) return;

    const handleSelectImage = (e) =>{
        const file = e.target.files[0];
        console.log(file)
        if(!file) return;
        setValue('image_name', file.name);
        handleUploadImage(file);
      }
    
      const handleUploadImage = (file) => {
        const storage = getStorage();
        const storageRef = ref(storage, "images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progressPercent =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(progressPercent);
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                console.log("Nothing at all");
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              setImage(downloadURL);
            });
          }
        );
      };
    
    
      const handleDeleteImage = () => {
        const storage = getStorage();
        const imageRef = ref(storage, "images/" + (imageName || getValues("image_name")));
        deleteObject(imageRef)
          .then(() => {
            console.log("Remove image successfully");
            setImage("");
            setProgress(0);
          })
          .catch((error) => {
            console.log("handleDeleteImage ~ error", error);
            console.log("Can not delete image");
          });
      };

      const handleResetUpload = () =>{
        setImage('');
        setProgress(0);
        cb && cb();
      }
    return {image,handleResetUpload, setImage, progress,handleDeleteImage, handleSelectImage};
}