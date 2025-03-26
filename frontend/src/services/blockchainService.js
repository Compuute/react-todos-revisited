import { ethers } from "ethers";
import TodoList from "../contracts/TodoList.json"; // ABI
import contractAddresses from "../contracts/contract-address.json"; // Address från Ignition

let contract;
let signer;

export const initBlockchain = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();

    const address = contractAddresses["TodoList"]; // Korrekt nyckel

    contract = new ethers.Contract(address, TodoList.abi, signer);
    console.log("Blockchain initialized", address);
  } else {
    alert("Please install MetaMask to use this app!");
  }
};

// Hämta alla todos
export const getTodos = async () => {
  if (!contract) {
    throw new Error("Contract not initialized");
  }
  const todos = [];
  const count = await contract.todoCount();
  for (let i = 0; i < count; i++) {
    const todo = await contract.todos(i);
    if (todo.id.toString() !== "0") {
      todos.push({
        id: todo.id.toString(),
        text: todo.text,
        completed: todo.completed,
      });
    }
  }
  return todos;
};

// Lägg till en ny todo
export const addTodo = async (text) => {
  if (!contract) {
    throw new Error("Contract not initialized");
  }
  const tx = await contract.createTodo(text);
  await tx.wait();
};

// Växla status
export const toggleTodoStatus = async (id) => {
  if (!contract) {
    throw new Error("Contract not initialized");
  }
  const tx = await contract.toggleTodo(id);
  await tx.wait();
};

// Ta bort todo
export const deleteTodo = async (id) => {
  if (!contract) {
    throw new Error("Contract not initialized");
  }
  const tx = await contract.removeTodo(id);
  await tx.wait();
};
