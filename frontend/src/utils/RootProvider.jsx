import { BlogProvider } from "./BlogContext";

import { UserProvider } from "./UserContext";

export function RootProvider({ Children }) {
  return (
    <UserProvider>
      <BlogProvider>{Children}</BlogProvider>
    </UserProvider>
  );
}
