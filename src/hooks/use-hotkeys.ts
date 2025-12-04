'use client';

import { useEffect } from 'react';
import hotkeys from 'hotkeys-js';

type Hotkey = [string, (event: KeyboardEvent) => void];

export function useHotkeys(hotkeysToAdd: Hotkey[], deps: any[] = []) {
  useEffect(() => {
    hotkeys.filter = () => true; // Allow hotkeys in inputs, textareas, etc.
    
    hotkeysToAdd.forEach(([keys, callback]) => {
      hotkeys(keys, (event) => {
        event.preventDefault();
        callback(event);
      });
    });

    return () => {
      hotkeysToAdd.forEach(([keys]) => {
        hotkeys.unbind(keys);
      });
    };
  }, [hotkeysToAdd, ...deps]);
}
