'use client'

import {requireAuthClient} from "@/lib/requireAuthClient";

export default function RequiredAuthClient() {
  const {user, isLoading} = requireAuthClient();

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {user && (
        <div>
          This page requires authentication, you are signed in as {user.given_name}
        </div>
      )}
    </>
  );
}