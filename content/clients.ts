import type { StaticImageData } from "next/image";
import threeGen from "@/public/brand/clients/3gen-consulting.png";
import bluspring from "@/public/brand/clients/bluspring.png";
import computomic from "@/public/brand/clients/computomic.png";
import devanco from "@/public/brand/clients/devanco-foods.png";
import eplan from "@/public/brand/clients/eplan.png";
import firstLiving from "@/public/brand/clients/first-living.png";
import idf from "@/public/brand/clients/idf.png";
import jemcare from "@/public/brand/clients/jemcare.png";
import kimia from "@/public/brand/clients/kimia.png";
import mobolutions from "@/public/brand/clients/mobolutions.png";
import purpleCow from "@/public/brand/clients/purple-cow-training.png";
import recurrentEnergy from "@/public/brand/clients/re.png";
import socal from "@/public/brand/clients/socal-steamwater.png";
import strongerFamilies from "@/public/brand/clients/stronger-families.png";

/** Client logos for the home page logo loop (from the SSPM site, in its order). */
export const clients: { name: string; logo: StaticImageData }[] = [
  { name: "3Gen Consulting", logo: threeGen },
  { name: "Mobolutions", logo: mobolutions },
  { name: "Stronger Families", logo: strongerFamilies },
  { name: "Purple Cow Training", logo: purpleCow },
  { name: "Jemcare", logo: jemcare },
  { name: "Bluspring", logo: bluspring },
  { name: "Computomic", logo: computomic },
  { name: "Devanco Foods", logo: devanco },
  { name: "Eplan", logo: eplan },
  { name: "First Living", logo: firstLiving },
  { name: "IDF", logo: idf },
  { name: "Kimia", logo: kimia },
  { name: "Recurrent Energy", logo: recurrentEnergy },
  { name: "Socal Steamwater", logo: socal },
];
