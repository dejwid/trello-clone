import {Liveblocks} from "@liveblocks/node";
import {NextRequest} from "next/server";

export async function PUT(req:NextRequest) {
  const {id, update} = await req.json();
  const liveblocks = new Liveblocks({secret: process.env.LIVEBLOCKS_SECRET_KEY as string});
  console.log({id,update});
  await liveblocks.updateRoom(id, update);
  return Response.json(true);
}