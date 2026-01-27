import { createContext, useContext } from 'react';
import { useTodo } from '../hooks/useTodo'; 

export const TodoContext = createContext();

export function TodoProvider({children}) {
    const store = useTodo();
    return <TodoContext.Provider value={store}>
        {children}
    </TodoContext.Provider>
}

export default function useTodoContext() {
    return useContext(TodoContext)
}
