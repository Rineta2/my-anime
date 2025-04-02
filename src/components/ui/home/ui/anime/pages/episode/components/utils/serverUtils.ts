import {
  ServerResponse,
  AvailableServers,
  ServerInfo,
} from "@/components/ui/home/ui/anime/pages/episode/types/types";

export const checkServer = async (serverId: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/server/${serverId}`, {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
      },
    });

    const data: ServerResponse = await response.json();
    return response.ok && data.ok && !!data.data?.url;
  } catch (err) {
    console.error(`Error checking server ${serverId}:`, err);
    return false;
  }
};

interface ServerQuality {
  title: string;
  serverList: Array<{
    title: string;
    serverId: string;
  }>;
}

interface ServerData {
  qualities: ServerQuality[];
}

export const groupServers = (servers: ServerData): AvailableServers => {
  const groups: AvailableServers = {};

  if (!servers?.qualities) return {};

  servers.qualities.forEach((quality: ServerQuality) => {
    if (!quality?.serverList?.length) return;

    quality.serverList.forEach((server) => {
      const baseServerName = server.title.split(" ")[0];
      if (!groups[baseServerName]) {
        groups[baseServerName] = [];
      }

      groups[baseServerName].push({
        serverName: server.title,
        serverId: server.serverId,
        quality: quality.title,
      });
    });
  });

  // Sort qualities within each server group
  Object.values(groups).forEach((serverList: ServerInfo[]) => {
    serverList.sort(
      (a: ServerInfo, b: ServerInfo) =>
        parseInt(a.quality) - parseInt(b.quality)
    );
  });

  return groups;
};
