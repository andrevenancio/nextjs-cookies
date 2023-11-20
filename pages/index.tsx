/** Add your relevant code here for the issue to reproduce */
import { GetServerSidePropsContext } from "next"
import { withSecureRoutes } from "../components"

export default function Home() {
  return <div>this is a protected page</div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log("index get server side props")
  const secureRoute = await withSecureRoutes(context)

  return {
    props: {
      ...secureRoute,
    },
  }
}
