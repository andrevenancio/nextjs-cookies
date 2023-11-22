/** Add your relevant code here for the issue to reproduce */
import { GetServerSidePropsContext } from "next"
import { withSecureRoutes } from "../components"

export default function Home() {
  return <div>This is my homepage</div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const secureRoute = await withSecureRoutes(context)

  return {
    props: {
      ...secureRoute,
    },
  }
}
