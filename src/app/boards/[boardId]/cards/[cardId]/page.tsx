import BoardPage from "@/app/boards/[boardId]/page";

type PageProps = {
  params: {
    boardId: string;
    cardId: string;
  };
};

export default function CardPage({params}:PageProps) {
  return (
    <BoardPage params={params} />
  );
}