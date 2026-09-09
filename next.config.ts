import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A home do Julio tem um package-lock.json solto, e sem isto o Turbopack
  // elege a home como raiz do workspace. Trava a raiz neste projeto.
  turbopack: { root: path.resolve(process.cwd()) },
};

export default nextConfig;
