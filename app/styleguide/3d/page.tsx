import type { Metadata } from "next";
import { ShapeLab } from "@/app/styleguide/3d/ShapeLab";

export const metadata: Metadata = { title: "3D shapes", robots: { index: false, follow: false } };

export default function ThreeStyleguide() {
  return (
    <div className="shell flex flex-col gap-10 pt-32 pb-24">
      <h1 className="title-l">Particle shapes</h1>
      <ShapeLab />
    </div>
  );
}
