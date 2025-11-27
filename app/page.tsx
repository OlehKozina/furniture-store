import Hero from "./components/Hero";
import dynamic from "next/dynamic";
import { getPageHome } from "@/sanity/sanity-utils";

export default async function Home() {
  const [pageHome] = await Promise.all([getPageHome()]);

  const { hero, components } = pageHome[0] || {};
  const ComponentsList = dynamic(() => import("./components/ComponentsList"));

  return (
    <>
      {hero && <Hero hero={hero} />}
      {components && <ComponentsList components={components} />}
    </>
  );
}
