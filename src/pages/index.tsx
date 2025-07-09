import Image from "next/image";
import { DeedForm } from "@/components/DeedPage";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="">
      <DeedForm />
      <Toaster />
    </div>
  );
}
