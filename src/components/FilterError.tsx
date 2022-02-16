import { ReactNode } from 'react'
import { Text } from '../kbridh/Text'

export const FilterError = () => {
  return (
    <div>
      <h2 className="kbridh-heading-l">An error has occured</h2>
      <Text>
        Something went wrong when processing your request. Please try again.
      </Text>
    </div>
  )
}

interface ResultProps {
  error?: boolean
  children?: ReactNode
}

export const Result = (props: ResultProps) => {
  return props.error ? <FilterError /> : <>{props.children}</>
}
