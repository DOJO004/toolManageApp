import { NewNotifyItem, ToolSpecItem } from "@/scripts/Apis/toolInfo/types";
import { FormEvent } from "react";

interface Props {
  postNotify: (e: FormEvent) => void;
  newNotify: NewNotifyItem;
  handleNewNotify: (key: string, value: string | number) => void;
  toolSpecList: ToolSpecItem[];
}

export default function NewNotifyForm({
  postNotify,
  newNotify,
  handleNewNotify,
  toolSpecList,
}: Props) {
  return (
    
  );
}
