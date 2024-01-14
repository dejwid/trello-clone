'use client';
import {RoomProvider, } from "@/app/liveblocks.config";
import PresenceAvatars from "@/components/PresenceAvatars";
import {RoomInfo} from "@liveblocks/node";
import Link from "next/link";

export default function BoardsTiles({boards}:{boards:RoomInfo[]}) {

  return (
    <>
        <div className="my-4 grid md:grid-cols-3 lg:grid-cols-4 gap-2">
          {boards?.length > 0 && boards.map(board => (
            <Link
              className="bg-gray-200 px-8 py-12 rounded-md block relative"
              href={`/boards/${board.id}`}
              key={board.id}>
              {board.metadata.boardName}
              <RoomProvider id={board.id} initialPresence={{}}>
                <div className="absolute bottom-1 right-1">
                  <PresenceAvatars presenceKey={'boardId'} presenceValue={board.id}/>
                </div>
              </RoomProvider>
            </Link>
          ))}
        </div>
    </>
  );
}