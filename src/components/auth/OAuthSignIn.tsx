"use client"

import { useState } from "react"
import { Icons } from "@/constants/icons"
import { useSignIn } from "@clerk/nextjs"
import type { OAuthStrategy } from "@clerk/types"

import { catchClerkError } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const oauthProviders = [
  { name: "Google", strategy: "oauth_google", icon: "google" },
  { name: "Discord", strategy: "oauth_discord", icon: "discord" },
  { name: "GitHub", strategy: "oauth_github", icon: "gitHub" },
] satisfies {
  name: string
  strategy: OAuthStrategy
  icon: keyof typeof Icons
}[]

const OAuthSignIn = () => {
  const [isLoading, setIsLoading] = useState<OAuthStrategy | null>(null)
  const { signIn, isLoaded } = useSignIn()

  const oauthSignUp = async (provider: OAuthStrategy) => {
    if (!isLoaded) return

    try {
      setIsLoading(provider)
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      })
    } catch (error) {
      setIsLoading(null)
      catchClerkError(error)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon]

        return (
          <Button
            key={provider.strategy}
            aria-label={`Sign up with ${provider.name}`}
            variant="outline"
            className="w-full bg-background sm:w-auto"
            onClick={() => oauthSignUp(provider.strategy)}
            disabled={isLoading !== null}
          >
            {isLoading === provider.strategy ? (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ) : (
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            {provider.name}
          </Button>
        )
      })}
    </div>
  )
}

export default OAuthSignIn
