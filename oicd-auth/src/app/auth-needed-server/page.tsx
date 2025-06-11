import {requireAuthServer} from "../../lib/requireAuthServer";

export default async function Home() {
  const session = await requireAuthServer();

  return (
    <div>
      This page requires authentication, you are signed in as {session.user.given_name}
    </div>
  );
}