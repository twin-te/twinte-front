import * as dotenv from "dotenv";

dotenv.config();

const CACHE_NAME = "TwinteFallback";
const VERSIONS = ["v1"];

let base_url: string;

if (process.env.NODE_ENV === "development") {
  base_url = process.env.BASE_URL || "http://localhost:4000";
} else {
  base_url = process.env.BASE_URL;
}

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("install", () => {
  VERSIONS.slice(0, Math.max(0, VERSIONS.length - 2)).forEach(
    async (version) => {
      await caches.delete(getCacheName(CACHE_NAME, version));
    }
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;
  if (
    !(
      request.url.startsWith(base_url) ||
      request.url.startsWith("https://fonts.googleapis.com/") ||
      request.url.startsWith("https://fonts.gstatic.com/")
    )
  )
    return;

  event.respondWith(getResponseWithCaching(request));
});

const getCacheName = (name: string, version: string) => `${name}_${version}`;

const getResponseWithCaching = async (request: Request): Promise<Response> => {
  const cache = await caches.open(
    getCacheName(CACHE_NAME, VERSIONS[VERSIONS.length - 1])
  );

  let response: Response | undefined;

  const hasCredentials = request.url.startsWith(base_url);

  try {
    response = await fetch(
      request,
      hasCredentials
        ? {
            credentials: "include",
          }
        : {}
    );
  } catch (error) {
    console.error(error);
    response = await cache.match(request.url);
    if (!response) throw new Error("There is no cache");
  }

  if (response.ok) cache.put(request, response.clone());

  return response;
};
