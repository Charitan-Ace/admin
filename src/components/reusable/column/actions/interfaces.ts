export interface ActionItem {
  handlerName: string;
  handler: (rowId: string | number) => void;
}

export interface ActionsProps {
  rowId: string | number;
  actionItems: ActionItem[];
}
