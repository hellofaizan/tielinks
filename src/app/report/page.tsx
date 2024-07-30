import React, { Suspense } from "react";

const ReportPage = React.lazy(() => import("./components/ReportPage"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReportPage />
    </Suspense>
  );
}

export default App;
