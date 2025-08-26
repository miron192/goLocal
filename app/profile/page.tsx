import { checkUser } from "@/lib/checkUser";
import { redirect } from "next/navigation";

export default async function page() {
  const dbUser = await checkUser();

  if (!dbUser) {
    redirect("/");
  }

  return <div>pag1e11</div>;
}
