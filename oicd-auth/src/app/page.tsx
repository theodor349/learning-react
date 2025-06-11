import ClientProfile from '@/components/clientProfile'
import ServerProfile from '@/components/serverProfile'
import {auth0} from "@/lib/auth0";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <a href="/auth/login">Login</a>
        <a href="/auth/logout">Logout</a>

        <div>
          <ClientProfile />
        </div>
        <div>
          <ServerProfile />
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}