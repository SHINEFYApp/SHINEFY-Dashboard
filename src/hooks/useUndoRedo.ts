import { useCallback, useState } from "react";
import type { HistoryState } from "../types/msgDetails";

export function useUndoRedo<T>(initialValue: T) {
  const [state, setState] = useState<HistoryState<T>>({
    past: [],
    present: initialValue,
    future: [],
  });

  const set = useCallback((newValue: T) => {
    setState((current) => ({
      past: [...current.past, current.present],
      present: newValue,
      future: [],
    }));
  }, []);

  const undo = useCallback(() => {
    setState((current) => {
      if (current.past.length === 0) return current;

      const previous = current.past[current.past.length - 1];
      const newPast = current.past.slice(0, -1);

      return {
        past: newPast,
        present: previous,
        future: [current.present, ...current.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((current) => {
      if (current.future.length === 0) return current;

      const next = current.future[0];
      const newFuture = current.future.slice(1);

      return {
        past: [...current.past, current.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  return {
    value: state.present,
    set,
    undo,
    redo,
    canUndo: state.past.length > 0,
    canRedo: state.future.length > 0,
  };
}
