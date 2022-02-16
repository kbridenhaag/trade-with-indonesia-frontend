import { NextPage } from 'next'
import { useKbridhFormik } from '../../hooks/use-kbridh-formik'
import { Button } from '../../kbridh/Button'
import { FormGroup } from '../../kbridh/FormGroup'
import { GridColumn } from '../../kbridh/GridColumn'
import { GridRow } from '../../kbridh/GridRow'
import { Label } from '../../kbridh/Label'
import { Text } from '../../kbridh/Text'
import { TextInput } from '../../kbridh/TextInput'
import { DefaultLayout } from '../../layouts/DefaultLayout'
import * as Yup from 'yup'
import { ErrorMessage } from '../../kbridh/ErrorMessage'
import { Link } from '../../kbridh/Link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useUser from '../../hooks/use-user'

const SignInLocalPage: NextPage = () => {
  const { user, mutateUser } = useUser({
    redirectIfFound: true,
    redirectTo: '/'
  })

  const [error, setError] = useState<string | null>()
  const handleSignIn = async (body: { email: string; password: string }) => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json'
      }
    })

    if (result.ok) {
      const { accessToken } = await result.json()
      localStorage.setItem('__BATIK_ACCESS__', accessToken)

      return {
        accessToken,
        error: false
      } as const
    }

    return {
      error:
        result.status === 401 || result.status === 404
          ? 'CredentialsError'
          : 'UnknownError',
      accessToken: false
    } as const
  }

  const formik = useKbridhFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('You must enter a valid email')
        .required('You must enter a valid email'),
      password: Yup.string().required('You must enter your password')
    }),
    onSubmit: async (values) => {
      setError(null)
      formik.setErrors({})
      const { accessToken, error } = await handleSignIn(values)

      mutateUser()

      if (error === 'CredentialsError') {
        formik.setErrors({
          email: 'Please check your email',
          password: 'Please check your password'
        })
        setError(
          () => 'No user has been found for this username and/or password'
        )
      } else if (error === 'UnknownError') {
        setError(() => 'An unknown error occured. Please try again.')
      }
    },
    validateOnBlur: false,
    validateOnChange: false
  })

  return (
    <DefaultLayout title="Sign in with your Batik ID">
      <GridRow>
        <GridColumn width="two-thirds">
          {error && (
            <div className="app-warning app-warning--error">{error}</div>
          )}
          <Text size="heading-xl" as="h1">
            Sign in with your Batik ID
          </Text>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup error={!!formik.errors.email}>
              <Label htmlFor="email">Email address</Label>
              {formik.errors.email && (
                <ErrorMessage>{formik.errors.email}</ErrorMessage>
              )}
              <TextInput width={20} {...formik.getFieldProps('email')} />
            </FormGroup>
            <FormGroup error={!!formik.errors.password}>
              <Label htmlFor="password">Password</Label>
              {formik.errors.password && (
                <ErrorMessage>{formik.errors.password}</ErrorMessage>
              )}
              <TextInput
                type="password"
                width={20}
                {...formik.getFieldProps('password')}
              />
            </FormGroup>

            <Button as="button" type="submit">
              Sign in
            </Button>
          </form>
          <Text>
            <Link className="kbridh-link--no-visited-state" href="/sign-in">
              Sign in with another method
            </Link>
          </Text>
        </GridColumn>
      </GridRow>
    </DefaultLayout>
  )
}

export default SignInLocalPage
