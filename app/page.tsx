import { currentUser } from "@clerk/nextjs/server";
import Guest from "@/components/guest";
export default async function Home() {
  const user = await currentUser();
  if (!user) {
    return (
      <Guest />
    )
  }
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <p className="bg-red-400 p-4 rounded-lg">Hello</p>
    </div>
  );
}
