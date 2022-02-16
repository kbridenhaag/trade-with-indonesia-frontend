class FetchError extends Error {
  public info: any
  public status: number

  constructor(message: string) {
    super(message)

    this.status = 500
  }
}

export const fetcher = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new FetchError('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

export const fetcherWithAuth = async (url: string) => {
  const token = localStorage.getItem('__BATIK_ACCESS__')

  if (token) {
    const res = await fetch(url, {
      headers: {
        authorization: 'Bearer ' + token
      }
    })

    if (!res.ok) {
      const error = new FetchError('An error occurred while fetching the data.')
      error.info = await res.json()
      error.status = res.status
      throw error
    }

    return res.json()
  } else {
    const error = new FetchError('You are not currently signed in')
    error.status = 401
    throw error
  }
}

export const fetchUser = async (url: string) => {
  try {
    return await fetcherWithAuth(url)
  } catch (e: any) {
    if (e.status === 401) {
      return {
        isSignedOut: true
      }
    } else {
      throw e
    }
  }
}
