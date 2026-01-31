import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary hover:bg-primary/90",
            card: "shadow-xl",
          },
        }}
      />
    </div>
  );
}
