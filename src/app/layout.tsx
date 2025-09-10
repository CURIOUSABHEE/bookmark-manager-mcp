import {
  ClerkProvider,
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import './globals.css'




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header className="header">
            <div>
              <h1 style={{fontSize: "24px", fontWeight: "bold"}}>
                Bookmark Manager
              </h1>
            </div>
            <div style={{
              display: "flex", gap: '15px', alignContent: 'center'
            }}>
              <SignedOut>
                <SignInButton>
                  <button className='btn btn-primary'>
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className='btn btn-primary'>
                    Sign Out
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton/>
              </SignedIn>
            </div>
          </header>
          <main className='main'>
          {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}