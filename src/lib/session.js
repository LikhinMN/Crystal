import {prisma} from "@/lib/prisma";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

export async function getCurrentUser() {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/auth/signin")
    }
    console.log(session)
    const user = await prisma.user.findUnique(
        {
            where: {
                email: session.user.email
            }
        }
    )

    return user;
}
