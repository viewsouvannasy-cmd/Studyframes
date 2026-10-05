// library
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

// component
import { HeaderSection } from "../components/index/HeaderSection";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const naivgate = useNavigate();

  useEffect(() => {
    naivgate({ to: "/login" });

    document.title = "Studyframes";
  });

  return (
    <div className="flex w-dvw justify-center">
      <HeaderSection />
    </div>
  );
}
