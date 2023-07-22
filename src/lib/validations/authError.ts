import { isClerkAPIResponseError } from "@clerk/nextjs"
import { toast } from "sonner"

export const authError = (error: any) => {
  const unknownError = "Something went wrong, please try again."

  isClerkAPIResponseError(error)
    ? toast.error(error.errors[0]?.longMessage ?? unknownError)
    : toast.error(unknownError)
}
