import { SignUpForm } from "@/components/auth"
import { useSignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="p-6 w-80 h-80">
      <SignUpForm />
    </div>
  )
}