import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { addImageToProfile } from "@/services/userService";
import { ImageInput } from "@/types/ImageInput";
import Image from "next/image";

const ProfilePicture: React.FC = () => {
  const { data: session, update } = useSession();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const isFetched = React.useRef(false);

  useEffect(() => {
    if (session?.user?.image && !isFetched.current) {
      isFetched.current = true;
      setImageUrl(session.user.image);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [session]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    const userEmail = session?.user?.email;

    if (!userEmail) {
      setErrorMessage("User is not logged in. Please log in to upload an image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (event) => {
      if (event.target && typeof event.target.result === "string") {
        const base64String = event.target.result;

        const fileInput: ImageInput = {
          name: file.name,
          type: file.type,
          buffer: base64String.split(",")[1],
        };

        try {
          const updatedUser = await addImageToProfile(userEmail, fileInput);
          console.log("Updated User:", updatedUser);
          setImageUrl(updatedUser.image);

          await update({ image: updatedUser.image });
          setErrorMessage(null);
        } catch (error) {
          console.error("Error uploading image:", error);
          setErrorMessage("Error uploading image. Please try again.");
        }
      } else {
        console.error("Error: event.target is null or result is not a string");
        setErrorMessage("Error reading file. Please try again.");
      }
    };

    reader.onerror = (error) => {
      console.error("File reading error:", error);
      setErrorMessage("Error reading file. Please try again.");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex-shrink-0 mr-6">
      <div className="avatar" onClick={() => document.getElementById("file-upload")?.click()} style={{ cursor: "pointer" }}>
        <div className="ring-primary ring-offset-base-100 w-24 h-24 rounded-full ring ring-offset-2 relative">
          {loading ? (
            <div className="w-full h-full bg-gray-300 rounded-full animate-pulse"></div>
          ) : imageUrl ? (
            <Image 
              src={imageUrl} 
              alt="Profile" 
              fill 
              className="rounded-full object-cover"
              sizes="(max-width: 600px) 100px, (max-width: 1200px) 80px, 60px" // Set appropriate sizes
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-300 rounded-full"></div>
          )}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="hidden" 
            id="file-upload"
          />
        </div>
      </div>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default ProfilePicture;
