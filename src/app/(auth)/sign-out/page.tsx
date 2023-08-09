import SignOutButton from "@/components/auth/SignOutButton"
import { Container } from "@/components/custom"
import { SectionHeader } from "@/components/layout"

const SignOutPage = () => {
  return (
    <Container className="max-w-xs">
      <SectionHeader
        title="Sign out"
        description="Are you sure you want to sign out?"
        size="sm"
        className="text-center"
      />
      <SignOutButton />
    </Container>
  )
}

export default SignOutPage
