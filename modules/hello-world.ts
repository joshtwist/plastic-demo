import { ZuploContext, ZuploRequest, MemoryZoneReadThroughCache } from "@zuplo/runtime";


export default async function (request: ZuploRequest, context: ZuploContext) {

  const cache = new MemoryZoneReadThroughCache("pods-cache", context);
  let pods = await cache.get("all-pods");

  if (pods === undefined) {
    const response = await fetch('https://79c7862690dc44e6b2b9b404199c8d04.api.mockbin.io/');
    pods = await response.json();
    cache.put("all-pods", pods, 60);
  }
  
  const url = pods[request.user.data.customerId];

  return fetch(url, request);
}
