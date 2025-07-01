

interface NoteFormProps {
    noteText: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onAdd: () => void,
    maxLength?: number
}

export default function NoteForm({noteText, onChange, onAdd, maxLength= 200}: NoteFormProps) {

    const charsLeft = maxLength - noteText.length;

    return (
        <div className="bg-white p-4 rounded-sm py-4 h-[165px] relative">
            <div>
                <input
                    value={noteText}
                    onChange={onChange}
                    maxLength={maxLength}
                    type="text"
                    placeholder="Add note..."
                    className="p-3 border-gray-500 w-full border rounded placeholder-black"
                />
            </div>
            <div>
                <p className="text-black absolute bottom-5 left-5">{ charsLeft } Remaining</p>
                <button onClick={onAdd} className="absolute bottom-5 right-5 bg-blue-900 px-5 py-2 rounded text-white">Add Note</button>
            </div>
        </div>
    )
}
