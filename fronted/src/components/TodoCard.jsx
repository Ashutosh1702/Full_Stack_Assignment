const TodoCard = ({ todo, onEdit, onDelete }) => (
  <div className="p-4 border rounded flex justify-between items-center mb-2 bg-white shadow">
    <div>
      <div className="font-semibold text-lg">{todo.title}</div>
      <div className="text-gray-600 text-sm">{todo.description}</div>
      <div className="text-xs text-gray-400">Due: {todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'N/A'} | Category: {todo.category}</div>
      <div className="text-xs text-green-600">{todo.completed ? 'Completed' : ''}</div>
    </div>
    <div className="flex gap-2">
      <button onClick={onEdit} className="text-blue-500 hover:underline">Edit</button>
      <button onClick={onDelete} className="text-red-500 hover:underline">Delete</button>
    </div>
  </div>
);
export default TodoCard; 