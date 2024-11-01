import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, GetObjectCommandOutput } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { Readable } from "stream";
import { ImageInput } from "@/types/ImageInput";

class S3Service {
  private s3: S3Client;
  private bucketName: string;
  private region: string;
  private accessKeyId: string;
  private secretAccessKey: string;

  constructor() {
    // Destructure the environment variables
    this.bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!;
    this.region = process.env.NEXT_PUBLIC_AWS_REGION!;
    this.accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!;
    this.secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!;

    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    });
  }

  async uploadImage(file: ImageInput, directory: string): Promise<string> {
    const imageBuffer = Buffer.from(file.buffer, "base64");
    const uniqueId = uuidv4();
    const sanitizedFileName = `${uniqueId}_${file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9\-\.]/g, "")}`;

    const params = {
      Bucket: this.bucketName,
      Key: `${directory}/${sanitizedFileName}`,
      Body: imageBuffer,
      ContentType: file.type,
    };

    try {
      const command = new PutObjectCommand(params);
      await this.s3.send(command);
      return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${directory}/${sanitizedFileName}`;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Error uploading image");
    }
  }

  async retrieveImage(imageUrl: string): Promise<string> {
    const key = imageUrl.split("/").pop() || ""; // Extract the key from the image URL
    console.log("Retrieving image with key:", key);
  
    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: "user_profiles/" + key,
    };
  
    try {
      const command = new GetObjectCommand(params);
      const data: GetObjectCommandOutput = await this.s3.send(command);
  
      if (!data.Body || !(data.Body instanceof Readable)) {
        throw new Error("Invalid data body returned from S3");
      }
  
      const chunks: Buffer[] = [];
      
      // Read the stream and collect chunks
      for await (const chunk of data.Body as Readable) {
        chunks.push(chunk);
      }
  
      const buffer = Buffer.concat(chunks);
  
      // Convert Buffer to Base64 string
      const imageURL = buffer.toString("base64");
      return `data:image/jpeg;base64,${imageURL}`; // Return the Base64 string
    } catch (error) {
      console.error("Error retrieving image:", error);
      throw new Error("Error retrieving image");
    }
  }

  async deleteImage(imageUrl: string): Promise<void> {
    const key = imageUrl.split("/").pop() || ""; // Extract the key from the image URL
    console.log("Deleting image with key:", key);

    const params = {
      Bucket: this.bucketName,
      Key: "user_profiles/" + key,
    };

    try {
      const command = new DeleteObjectCommand(params);
      await this.s3.send(command);
      console.log("Image deleted successfully:", key);
    } catch (error) {
      console.error("Error deleting image:", error);
      throw new Error("Error deleting image");
    }
  }

}

export default S3Service;
