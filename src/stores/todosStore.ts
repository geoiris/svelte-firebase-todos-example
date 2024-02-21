import { db } from '$lib/firebase';
import { collection, deleteDoc, doc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';
import { writable } from 'svelte/store'

const todosCollection = collection(db, 'todos');

const createtodosStore = () => {
  const { subscribe, set } = writable([]);

  const fetchtodos = async () => {
    const querySnapshot = await getDocs(todosCollection);
    const todos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    set(todos);
  };

  const addtodo = async todo => {
    const id = crypto.randomUUID();
    await setDoc(doc(todosCollection, id), {
        text: todo.text,
        completed: todo.completed,
        id,
      });
  };

  const deletetodo = async id => {
    await deleteDoc(doc(todosCollection, id));
  };

  const unsubscribe = onSnapshot(todosCollection, snapshot => {
    const todos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    set(todos);
  });
  
  const updatetodo = async (todo) => {
    await setDoc(doc(todosCollection, todo.id), todo);
  };

  return {
    subscribe,
    addtodo,
    deletetodo,
    updatetodo,
    set: fetchtodos
  };
};

const todosStore = createtodosStore();
export default todosStore;
