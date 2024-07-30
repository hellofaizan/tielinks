import React, { Suspense } from "react";

const UsernamePage = React.lazy(() => import("./components/UserPage"));

function App({ params }: { params: { username: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UsernamePage params={params} />
    </Suspense>
  );
}

export default App;
