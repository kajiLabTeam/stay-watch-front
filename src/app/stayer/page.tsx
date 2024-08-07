"use client"
import ErrorBoundary from "@/components/common/ErrorBoundary";
import Stayer from "@/features/stayer/Stayer";
import { Suspense } from "react";

const Home = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>loading...</div>}>
        <Stayer />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Home;