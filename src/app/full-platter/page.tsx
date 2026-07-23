import { redirect } from "next/navigation";

export default function FullPlatterRedirect() {
  redirect("/choose-your-meal#full");
}
