import { checkUser } from "@/lib/checkuser";
export default function Navbar() {
  const user = checkUser();
  return <nav>navbar</nav>;
}
