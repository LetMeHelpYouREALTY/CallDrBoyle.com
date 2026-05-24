import { serverEnv } from "@/lib/site-env/server";

export function isNotionConfigured(): boolean {
  return Boolean(serverEnv.notionToken);
}

export function getNotionHeaders(): HeadersInit {
  const token = serverEnv.notionToken;
  if (!token) {
    throw new Error("NOTION_TOKEN is not configured");
  }
  return {
    Authorization: `Bearer ${token}`,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
  };
}
