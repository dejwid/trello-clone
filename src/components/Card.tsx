'use client';
import {BoardContext} from "@/components/BoardContext";
import PresenceAvatars from "@/components/PresenceAvatars";
import Link from "next/link";
import {useParams, useRouter} from "next/navigation";
import {useContext, useEffect} from "react";

export default function Card({id, name}: {id:string, name:string}) {
  const params = useParams();
  const router = useRouter();
  const {openCard} = useContext(BoardContext);

  useEffect(() => {
    if (params.cardId && !openCard) {
      const {boardId, cardId} = params;
      router.push(`/boards/${boardId}`);
      router.push(`/boards/${boardId}/cards/${cardId}`);
    }
    if (!params.cardId && openCard) {
      router.push(`/boards/${params.boardId}`);
    }
  },[params.cardId]);

  return (
    <Link
      href={`/boards/${params.boardId}/cards/${id}`}
      className="relative border block bg-white my-2 py-8 px-4 rounded-md">
      <span>{name}</span>
      <div className="absolute bottom-1 right-1">
        <PresenceAvatars presenceKey={'cardId'} presenceValue={id} />
      </div>
    </Link>
  );
}