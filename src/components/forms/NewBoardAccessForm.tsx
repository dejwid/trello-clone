'use client';
import {addEmailToBoard} from "@/app/actions/boardActions";
import {useRouter} from "next/navigation";
import {useRef} from "react";

export default function NewBoardAccess({boardId}:{boardId:string}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  async function addEmail(formData: FormData) {
    const email = formData.get('email')?.toString() || '';
    await addEmailToBoard(boardId, email);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    router.refresh();
  }
  return (
    <form action={addEmail} className="max-w-xs">
      <h2 className="text-lg mb-2">Add email</h2>
      <input ref={inputRef} type="text" placeholder="john@example.com" name="email"/>
      <button className="w-full mt-2" type="submit">Save</button>
    </form>
  );
}