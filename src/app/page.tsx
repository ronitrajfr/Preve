import { Home } from "@/components/Home/Home";
import { useUser } from "@clerk/clerk-react";

export default function Page() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (user == null || user == undefined) {
    return;
  }

  return (
    <main className="bg-slate-900 h-screen flex">
      <Home />
      <div>Hello {user.fullName}!</div>
    </main>
  );
}
