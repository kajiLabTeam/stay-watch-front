"use client"
import ErrorBoundary from "@/components/common/ErrorBoundary";
import Stayer from "@/features/stayer/Stayer";
import { Suspense } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter()
  router.push("/stayer")
  router.refresh()

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <div></div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Home;