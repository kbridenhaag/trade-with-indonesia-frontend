import useUser from '../hooks/use-user'
import { Button } from '../kbridh/Button'
import { WidthContainer } from '../kbridh/WidthContainer'

export const AuthBanner = () => {
  const { user, signOut } = useUser()

  return (
    <div className="app-auth-banner">
      <WidthContainer>
        <div className="app-auth-banner__text">
          {user && !user.isSignedOut ? (
            <>
              <span>Currently signed in as {user.email}</span>
              <Button
                className="kbridh-!-margin-bottom-0 kbridh-!-margin-left-4"
                as="button"
                color="warning"
                onClick={() => signOut()}
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <span>You are not signed in</span>

              <Button
                className="kbridh-!-margin-bottom-0 kbridh-!-margin-left-4"
                as="internalHref"
                href="/sign-in"
              >
                Sign in
              </Button>
            </>
          )}
        </div>
      </WidthContainer>
    </div>
  )
}
