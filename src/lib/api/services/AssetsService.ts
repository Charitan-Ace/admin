import APIClient from "../Client";

export default class AssetsService {
  constructor(private client: APIClient) {}

  async getUploadSignedUrl(fileName: string, userId: string): Promise<string> {
    console.log("Getting signed URL for file:", fileName);
    return this.client.postText(`/api/profile/asset/upload/${userId}`, {
      body: JSON.stringify({fileName: fileName}),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async uploadImage(signedUrl: string, file: File): Promise<void> {
    try {
      await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });
      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }

  async fetchImage(url: string): Promise<string> {
    if (!url) return '';
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      return objectUrl;
    } catch (error) {
      console.error("Error retrieving image from MinIO:", error);
      return ''; // Return empty string for failed image loads
    }
  }



  async  uploadFileWithSignedUrl(file: File, userId: string): Promise<string> {
    try {
        console.log("Uploading file:", file.name);
        console.log("heh", JSON.stringify({fileName: file.name}));
      // Get signed URL with file name
      const signedUrl = await this.getUploadSignedUrl(file.name, 
        userId
      );

      console.log("Received signed URL:", signedUrl);
      
      // Upload the file using the signed URL
      await this.uploadImage(signedUrl, file);
      return signedUrl;
      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error in upload process:", error);
      throw error;
    }
  }
}
