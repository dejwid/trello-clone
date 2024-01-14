import {Card, useMutation, useStorage} from "@/app/liveblocks.config";
import CancelButton from "@/components/CancelButton";
import {faClose, faEllipsis, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {shallow} from "@liveblocks/core";
import {FormEvent, useState} from "react";
import {ReactSortable} from "react-sortablejs";
import NewCardForm from "@/components/forms/NewCardForm";
import {default as ColumnCard} from '@/components/Card';

type ColumnProps = {
  id: string;
  name: string;
};

export default function Column({id, name}: ColumnProps) {

  const [renameMode, setRenameMode] = useState(false);

  const columnCards = useStorage<Card[]>(root => {
    return root.cards
      .filter(card => card.columnId === id)
      .map(c => ({...c}))
      .sort((a,b) => a.index - b.index);
  }, shallow);

  const updateCard = useMutation(({storage}, index, updateData) => {
    const card = storage.get('cards').get(index);
    if (card) {
      for (let key in updateData) {
        card?.set(key as keyof Card, updateData[key]);
      }
    }
  }, []);

  const updateColumn = useMutation(({storage}, id, newName) => {
    const columns = storage.get('columns');
    columns.find(c => c.toObject().id === id)?.set('name', newName);
  }, []);

  const deleteColumn = useMutation(({storage}, id) => {
    const columns = storage.get('columns');
    const columnIndex = columns.findIndex(c => c.toObject().id === id);
    columns.delete(columnIndex);
  }, [])

  const setTasksOrderForColumn = useMutation(({storage}, sortedCards:Card[], newColumnId) => {
    const idsOfSortedCards = sortedCards.map(c => c.id.toString());
    const allCards:Card[] = [...storage.get('cards').map(c => c.toObject())];
    idsOfSortedCards.forEach((sortedCardId, colIndex) => {
      const cardStorageIndex = allCards.findIndex(c => c.id.toString() === sortedCardId);
      updateCard(cardStorageIndex, {
        columnId: newColumnId,
        index: colIndex,
      });
    });
  }, []);

  function handleRenameSubmit(ev: FormEvent) {
    ev.preventDefault();
    const input = (ev.target as HTMLFormElement).querySelector('input');
    if (input) {
      const newColumnName = input.value;
      updateColumn(id, newColumnName);
      setRenameMode(false);
    }
  }

  return (
    <div className="w-48 bg-white shadow-sm rounded-md p-2">
      {!renameMode && (
        <div className="flex justify-between">
          <h3>{name}</h3>
          <button className="text-gray-300" onClick={() => setRenameMode(true)}>
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>
      )}
      {renameMode && (
        <div className="mb-8">
          Edit name:
          <form onSubmit={handleRenameSubmit} className="mb-2">
            <input type="text" defaultValue={name}/>
            <button type="submit" className="w-full mt-2">Save</button>
          </form>
          <button
            onClick={() => deleteColumn(id)}
            className="bg-red-500 text-white p-2 flex gap-2 w-full items-center rounded-md justify-center">
            <FontAwesomeIcon icon={faTrash} />
            Delete column
          </button>
          <CancelButton onClick={() => setRenameMode(false)} />
        </div>
      )}
      {!renameMode && columnCards && (
        <>
          <ReactSortable
            list={columnCards}
            setList={items => setTasksOrderForColumn(items, id)}
            group="cards"
            className="min-h-12"
            ghostClass="opacity-40"
          >
            {columnCards.map(card => (
              <ColumnCard key={card.id} id={card.id} name={card.name} />
            ))}
          </ReactSortable>
        </>
      )}
      {!renameMode && (
        <NewCardForm columnId={id} />
      )}
    </div>
  );
}