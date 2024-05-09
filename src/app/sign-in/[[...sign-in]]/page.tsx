import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center h-screen items-center">
      <SignIn path="/sign-in" />
    </div>
  );
}
