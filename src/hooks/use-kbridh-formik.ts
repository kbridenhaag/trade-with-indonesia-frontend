import { FormikConfig, useFormik } from 'formik'

export const useKbridhFormik = <T extends object>(config: FormikConfig<T>) => {
  const formikBase = useFormik(config)

  const getFieldProps = (field: keyof T) => {
    const fieldProps = formikBase.getFieldProps(field)

    return {
      ...fieldProps,
      error: !!formikBase.errors[field]
    }
  }

  const formik = {
    ...formikBase,
    getFieldProps
  }

  return formik
}
