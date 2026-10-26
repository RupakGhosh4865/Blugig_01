import { createLucideIcon, type IconNode } from "lucide-react";
import { iconData } from "@/components/icons/iconData";

/**
 * The integration mark as a lucide icon, for chips and headings. Menus animate
 * the same geometry with <DrawIcon id="integrate">. Lucide renders the parts as
 * an array, so each gets a key.
 */
export const IntegrateIcon = createLucideIcon(
  "integrate",
  iconData.integrate.map(([tag, attrs], i): IconNode[number] => [tag, { ...attrs, key: `${tag}-${i}` }]),
);
