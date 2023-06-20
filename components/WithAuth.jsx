import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuth } from "@/context/AuthContext"

function WithAuth(Component) {
  return function AuthComponent(props) {
    const { currentUser } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!currentUser) {
            router.replace('/login')
        }
        }, [currentUser, router])

        if (!currentUser) {
            return null;
        }

    return <Component {...props} />
  }
}

export default WithAuth