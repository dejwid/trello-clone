'use client';
import {Presence, useOthers} from "@/app/liveblocks.config";
import {shallow} from "@liveblocks/core";

type Props = {
  presenceKey: keyof Presence;
  presenceValue: string;
};

export default function PresenceAvatars({
  presenceKey, presenceValue
}: Props) {

  const others = useOthers(users => {
    return users.filter(u => u.presence?.[presenceKey] === presenceValue);
  }, shallow);

  return (
    <div className="flex gap-1">
      {others.map(user => (
        <div key={user.id}>
          <img
            className="size-8 rounded-full"
            src={user.info.image} alt="avatar"/>
        </div>
      ))}
    </div>
  );
}