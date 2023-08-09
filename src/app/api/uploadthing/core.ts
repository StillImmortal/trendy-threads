import { currentUser } from "@clerk/nextjs"
import { createUploadthing, type FileRouter } from "uploadthing/next"

const f = createUploadthing()

// FileRouter for this app
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each route should contain unique route slug
  productImage: f({
    image: { maxFileCount: 3, maxFileSize: "16MB" },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async (req) => {
      // Check user authorization this runs on your server BEFORE upload
      const user = await currentUser()

      if (!user) throw new Error("Unauthorized")

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id }
    })
    // eslint-disable-next-line @typescript-eslint/require-await
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs on your server AFTER upload
      console.log("Upload complete for userId:", metadata.userId)
      console.log("file url", file.url)
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
