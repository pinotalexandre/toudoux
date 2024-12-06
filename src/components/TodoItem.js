export const TodoItem = ({ task, onDelete, onToggle }) => {
    return (
        <div className="group flex items-start gap-2 py-2 relative">
            <div 
                className={`flex-1 whitespace-pre-wrap ${
                    task.completed ? 'text-muted-foreground/40 line-through' : ''
                }`}
            >
                <span className="mr-2">{task.emoji}</span>
                <span>{task.text}</span>
            </div>
            
            {!task.completed ? (
                <button
                    onClick={() => onToggle(task.id)}
                    className="opacity-0 group-hover:opacity-60 hover:opacity-100 transition-opacity text-xs text-muted-foreground flex items-center gap-2"
                >
                    <div className="w-3 h-3 border border-muted-foreground/30 rounded-sm"></div>
                    Done
                </button>
            ) : (
                <button
                    onClick={() => onDelete(task.id)}
                    className="opacity-0 group-hover:opacity-60 hover:opacity-100 transition-opacity text-xs text-muted-foreground"
                >
                    Delete
                </button>
            )}
        </div>
    );
};
