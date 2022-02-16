import { FC } from 'react'
import useUser from '../hooks/use-user'

export function withAuth<T>(WrapperComponent: FC<T>) {
  const Component = (props: T) => {
    useUser({
      redirectTo: '/sign-in'
    })

    return <WrapperComponent {...props} />
  }

  return Component
}
