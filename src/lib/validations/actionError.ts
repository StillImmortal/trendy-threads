import { toast } from "sonner"

export const actionError = (error: any) => {
  error instanceof Error
    ? toast.error(error.message)
    : toast.error("Something went wrong, please try again.")
}