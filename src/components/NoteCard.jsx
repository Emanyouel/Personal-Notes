export default function NoteCard({ note, onEdit, onDelete }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const preview = note.content.length > 120
    ? note.content.slice(0, 120) + "..."
    : note.content;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-3 hover:border-gray-700 transition-colors duration-200">

      <h3 className="text-white font-semibold text-base leading-tight line-clamp-1">
        {note.title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed flex-1 whitespace-pre-line">
        {preview || <span className="italic text-gray-600">No content</span>}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-800">
        <span className="text-xs text-gray-600">{formattedDate}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(note)}
            className="text-xs text-gray-400 hover:text-purple-400 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors duration-200"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="text-xs text-gray-400 hover:text-red-400 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>

    </div>
  );
}
