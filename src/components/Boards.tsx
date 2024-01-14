'use server';

import BoardsTiles from "@/components/BoardsTiles";
import {liveblocksClient} from "@/lib/liveblocksClient";
import {getUserEmail} from "@/lib/userClient";

export default async function Boards() {
  const email = await getUserEmail();
  const {data:rooms} = await liveblocksClient.getRooms({userId: email});
  return (
    <BoardsTiles boards={rooms} />
  );
}