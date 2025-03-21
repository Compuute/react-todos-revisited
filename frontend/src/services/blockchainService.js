import { ethers } from "ethers";
import TodoList from "../contracts/TodoList.json";
import contractAddress from "../contracts/contract-address.json";

let contract;
let signer;

export const initBlockchain = async () => {
    if(window.ethereum) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = awaitprovider.getSigner();
  contract = new ethers.Contract(contractAddress.TodoList, TodoContract.abi, signer);
} else {
    alert("Please install MetaMask to use this app!");
}
}
//Hämta alla todos från kontraktet
export const getTodos = async () => {
    const todos = [];
    const count = await contract.todoCount();
    for (let i = 0; i < count; i++) {
        const todo = await contract.todos(i);
        if (todo.id.toString() !== "0" ) {
            todos.push({
                id: todo.id.toString(),
                text: todo.text,
                completed: todo.completed,
            });
        }
    }
    return todos;
}