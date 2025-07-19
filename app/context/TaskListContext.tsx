import React, { createContext, useContext, useReducer } from "react";

export interface TaskItem {
  id: string; // unique per property
  name: string;
  template: string; // code with {{var}} placeholders
  vars: Record<string, string>;
}

type Action =
  | { type: "add"; item: TaskItem }
  | { type: "remove"; id: string }
  | { type: "reorder"; from: number; to: number }
  | { type: "updateVars"; id: string; vars: Record<string, string> }
  | { type: "clear" };

function reducer(state: TaskItem[], action: Action): TaskItem[] {
  switch (action.type) {
    case "add":
      // avoid duplicate by id
      return state.find((t) => t.id === action.item.id)
        ? state
        : [...state, action.item];
    case "remove":
      return state.filter((t) => t.id !== action.id);
    case "reorder": {
      const next = [...state];
      const [moved] = next.splice(action.from, 1);
      next.splice(action.to, 0, moved);
      return next;
    }
    case "updateVars":
      return state.map((t) =>
        t.id === action.id ? { ...t, vars: action.vars } : t
      );
    case "clear":
      return [];
    default:
      return state;
  }
}

const TaskListCtx = createContext<
  [TaskItem[], React.Dispatch<Action>] | undefined
>(undefined);

export function TaskListProvider({ children }: { children: React.ReactNode }) {
  const hook = useReducer(reducer, []);
  return (
    <TaskListCtx.Provider value={hook}>{children}</TaskListCtx.Provider>
  );
}

export function useTaskList() {
  const ctx = useContext(TaskListCtx);
  if (!ctx) throw new Error("useTaskList must be inside provider");
  return ctx;
}