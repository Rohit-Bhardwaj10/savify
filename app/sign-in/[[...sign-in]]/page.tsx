import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="w-full max-w-md">
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 shadow-2xl shadow-black/50",
              headerTitle: "text-gray-100",
              headerSubtitle: "text-gray-400",
              formButtonPrimary: "bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 hover:from-emerald-400 hover:via-cyan-400 hover:to-blue-400 text-white font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all duration-300",
              formFieldInput: "bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500",
              formFieldLabel: "text-gray-300",
              footerActionLink: "text-emerald-400 hover:text-emerald-300",
              dividerLine: "bg-gray-600",
              dividerText: "text-gray-400",
              socialButtonsBlockButton: "bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50",
              formResendCodeLink: "text-emerald-400 hover:text-emerald-300",
              identityPreviewText: "text-gray-300",
              identityPreviewEditButton: "text-emerald-400 hover:text-emerald-300",
            },
          }}
        />
      </div>
    </div>
  );
}
