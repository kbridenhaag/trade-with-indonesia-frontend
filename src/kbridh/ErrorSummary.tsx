import classnames from 'classnames'

interface ErrorSummaryProps {
  errors: {
    name: string
    message: string
  }[]
  className?: string
}

export const ErrorSummary = (props: ErrorSummaryProps) => {
  const { errors, className } = props
  const classes = classnames(className, 'kbridh-error-summary')
  return (
    <div
      className={classes}
      aria-labelledby="error-summary-title"
      role="alert"
      tabIndex={-1}
      data-module="kbridh-error-summary"
    >
      <h2 className="kbridh-error-summary__title" id="error-summary-title">
        There is a problem
      </h2>
      <div className="kbridh-error-summary__body">
        <ul className="kbridh-list kbridh-error-summary__list">
          {errors.map((error, index) => (
            <li key={`error-${error}-${index}`}>
              <a href={`#${error.name}`}>{error.message}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
