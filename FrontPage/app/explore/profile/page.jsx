// app/explore/profile/page.jsx or page.tsx (your route)
import { Suspense } from "react";
import Profiles from "./ClientPage"; // or wherever your Profiles component lives

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
      <Profiles />
    </Suspense>
  );
}
