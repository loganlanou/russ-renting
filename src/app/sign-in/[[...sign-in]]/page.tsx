import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-slate-50 py-12 px-4">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: 'bg-slate-800 hover:bg-slate-700',
            footerActionLink: 'text-amber-600 hover:text-amber-700',
          }
        }}
      />
    </div>
  );
}
