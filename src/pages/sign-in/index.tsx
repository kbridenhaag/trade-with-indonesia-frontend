import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useUser from '../../hooks/use-user'
import { Button } from '../../kbridh/Button'
import { Fieldset } from '../../kbridh/Fieldset'
import { FormGroup } from '../../kbridh/FormGroup'
import { GridColumn } from '../../kbridh/GridColumn'
import { GridRow } from '../../kbridh/GridRow'
import { Legend } from '../../kbridh/Legend'
import { Radio, RadioLabel, Radios, RadiosHint } from '../../kbridh/Radios'
import { Text } from '../../kbridh/Text'
import { DefaultLayout } from '../../layouts/DefaultLayout'

const SignInPage: NextPage = () => {
  const router = useRouter()
  useUser({
    redirectIfFound: true,
    redirectTo: '/'
  })
  return (
    <DefaultLayout title="How would you like to sign-in?">
      <GridRow>
        <GridColumn width="two-thirds">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const signInMethod = formData.get('sign-in-method')
              if (signInMethod === 'google') {
                router.push('/sign-in/google')
              } else {
                router.push('/sign-in/local')
              }
            }}
          >
            <FormGroup>
              <Fieldset>
                <Legend>
                  <Text
                    as="h1"
                    size="heading-xl"
                    className="kbridh-!-margin-bottom-2"
                  >
                    How would you like to sign in?
                  </Text>
                </Legend>
                <Radios>
                  <Radio
                    id="local"
                    name="sign-in-method"
                    value="local"
                    defaultChecked
                  >
                    <RadioLabel htmlFor="local">Batik ID</RadioLabel>
                    <RadiosHint>
                      You have a Batik ID if you were assigned a password.
                    </RadiosHint>
                  </Radio>
                  <Radio id="google" name="sign-in-method" value="google">
                    <RadioLabel htmlFor="google">Google Workspace</RadioLabel>
                  </Radio>
                </Radios>
              </Fieldset>
            </FormGroup>
            <Button as="button" type="submit">
              Continue
            </Button>
          </form>
        </GridColumn>
      </GridRow>
    </DefaultLayout>
  )
}

export default SignInPage
