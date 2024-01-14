'use client';
import {Card, useMutation} from "@/app/liveblocks.config";
import {LiveObject} from "@liveblocks/core";
import {FormEvent} from "react";
import uniqid from "uniqid";

export default function NewCardForm({columnId}: {columnId: string}) {

  const addCard = useMutation(({storage}, cardName) => {
    return storage.get('cards').push(new LiveObject<Card>({
      name: cardName,
      id: uniqid.time(),
      columnId: columnId,
      index: 9999,
    }))
  }, [columnId]);

  function handleNewCardFormSubmit(ev: FormEvent) {
    ev.preventDefault();
    const input = (ev.target as HTMLFormElement).querySelector('input');
    if (input) {
      const cardName = input?.value;
      addCard(cardName);
      input.value = '';
    }
  }

  return (
    <form onSubmit={handleNewCardFormSubmit}>
      <input type="text" placeholder="card name"/>
    </form>
  );
}