import type { NextConfig } from "next";

// Quando o build roda dentro do GitHub Actions (ver .github/workflows/deploy-pages.yml),
// o site é publicado em https://<usuario>.github.io/<repo>/ — então HTML/CSS/JS
// precisam apontar para esse subcaminho. Localmente (`npm run dev` / `npm run build`
// fora do CI) o basePath fica vazio e tudo funciona normalmente em "/".
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath = isGithubActions && repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
