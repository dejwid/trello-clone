'use client';
import {Column, useMutation, useStorage} from "@/app/liveblocks.config";
import NewColumnForm from "@/components/forms/NewColumnForm";
import {LiveList, LiveObject, shallow} from "@liveblocks/core";
import {ReactSortable} from "react-sortablejs";
import {default as BoardColumn} from '@/components/Column';

export default function Columns() {
  const columns = useStorage(root => root.columns.map(c => ({...c})), shallow);

  const updateColumns = useMutation(({storage}, columns:LiveObject<Column>[]) => {
    storage.set('columns', new LiveList(columns));
  }, []);

  function setColumnsOrder(sortedColumns: Column[]) {
    const newColumns:LiveObject<Column>[] = [];
    sortedColumns.forEach((sortedColumn, newIndex) => {
      const newSortedColumn = {...sortedColumn};
      newSortedColumn.index = newIndex;
      newColumns.push(new LiveObject(newSortedColumn));
    });
    updateColumns(newColumns);
  }

  if (!columns) {
    return;
  }

  return (
    <div className="flex gap-4">
      <ReactSortable
        group={'board-column'}
        list={columns}
        className="flex gap-4"
        ghostClass="opacity-40"
        setList={setColumnsOrder}>
        {columns?.length > 0 && columns.map(column => (
          <BoardColumn
            key={column.id}
            {...column}
          />
        ))}
      </ReactSortable>
      <NewColumnForm/>
    </div>
  );
}