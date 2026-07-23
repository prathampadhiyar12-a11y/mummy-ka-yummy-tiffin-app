import { redirect } from "next/navigation";

export default function CustomizeMealRedirect() {
  redirect("/choose-your-meal#custom");
}
