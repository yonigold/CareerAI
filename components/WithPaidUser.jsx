import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/router"
import { useEffect } from "react"
function WithPaidUser(Component) {
    return function PaidUserComponent(props) {
        const { currentUser } = useAuth()
        const router = useRouter()

        useEffect(() => {
            if (currentUser) {
                if (!currentUser.hasPaid) {
                    router.replace('/payment')
                }
            } else {
                router.replace('/login')
            }
        }, [currentUser, router])

        return (currentUser && currentUser.hasPaid) ? <Component {...props} /> : null;
    }
}
  
export default WithPaidUser