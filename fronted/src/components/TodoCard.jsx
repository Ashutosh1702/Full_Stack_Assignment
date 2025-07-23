const TodoCard = ({ todo, onEdit, onDelete }) => (
  <div className="p-4 sm:p-6 border border-gray-200 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-semibold text-lg sm:text-xl text-gray-800 truncate">{todo.title}</h3>
          {todo.completed && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              ✓ Completed
            </span>
          )}
        </div>
        
        {todo.description && (
          <p className="text-gray-600 text-sm sm:text-base mb-3 line-clamp-2">{todo.description}</p>
        )}
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <span className="font-medium">Due:</span>
            <span>{todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'No due date'}</span>
          </div>
          {todo.category && (
            <div className="flex items-center gap-1">
              <span className="hidden sm:inline">|</span>
              <span className="font-medium">Category:</span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                {todo.category}
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-row sm:flex-col gap-2 sm:gap-3 sm:min-w-0">
        <button 
          onClick={onEdit} 
          className="flex-1 sm:flex-none bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Edit
        </button>
        <button 
          onClick={onDelete} 
          className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);
export default TodoCard; 