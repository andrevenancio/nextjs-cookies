import { ChangeEvent, FormEvent, ReactNode } from "react"
import { useState } from "react"
import { GetServerSidePropsContext } from "next"
import Cookies from "universal-cookie"

export const withSecureRoutes = async (context: GetServerSidePropsContext) => {
  console.log("withSecureRoutes")
  const cookies = new Cookies(context.req?.headers.cookie)
  const password = cookies.get("secret") ?? ""

  return {
    passwordProtected: process.env.NEXT_PUBLIC_PASSWORD_PROTECTED !== undefined,
    authorized: password === process.env.NEXT_PUBLIC_PASSWORD_PROTECTED,
  }
}

export const SecureRoutes = (props: {
  passwordProtected?: boolean
  authorized?: boolean
  children?: ReactNode
}) => {
  const [credentials, setCredentials] = useState({
    password: "",
  })

  const { passwordProtected = false, authorized, children } = props

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }))
  }

  const handleForm = (e: FormEvent) => {
    e.preventDefault()
    const cookies = new Cookies()
    cookies.set("secret", credentials.password, { path: "/" })
    window.location.href = "/"
  }

  return passwordProtected && authorized === false ? (
    <div>
      <form onSubmit={handleForm}>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleInputChange}
        />
        <button type="submit">Unlock</button>
      </form>
    </div>
  ) : (
    <>{children}</>
  )
}
