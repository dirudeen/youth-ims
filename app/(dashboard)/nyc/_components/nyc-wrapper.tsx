import { getNycParticipants } from "@/server/services/nyc-participants";
import { NycClient } from "./nyc-client";

interface NycWrapperProps {
  canEditData: boolean;
}

export async function NycWrapper({ canEditData }: NycWrapperProps) {
  const data = await getNycParticipants();
  return <NycClient data={data} canEditData={canEditData} />;
}
