import React, { useEffect, useState } from 'react';
import supabase from '../SuperbaseClient';

const Notes = () => {
    const [createNote, setCreateNote] = useState(false);
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetchNotes();
    }, []);
    // fetch all notes
    const fetchNotes = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data } = await supabase.from('notes').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
            setNotes(data || []);
        }
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // create a note
    const HandleSubmit = async (e) => {
        e.preventDefault();
        const { data: { user } } = await supabase.auth.getUser();

        await supabase.from('notes').insert({
            title: formData.title,
            content: formData.content,
            user_id: user.id,
        });

        setFormData({ title: "", content: "" });
        setCreateNote(false);
        fetchNotes(); // Refresh list
    };

    // delete note
    const handleDelete = async (id) => {
        await supabase.from('notes').delete().eq('id', id);
        fetchNotes();
    }

    // handle logout
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error.message);
        } else {
            window.location.href = '/';
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-10">

            {/* Header Section */}

            <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        Private Notes
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">Your encrypted notes</p>
                </div>

                <div className="flex items-center gap-3">
                    {/* New Note Button */}
                    <button
                        onClick={() => setCreateNote(true)}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl font-medium transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
                    >
                        + New Note
                    </button>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/50 px-5 py-2 rounded-xl font-medium text-slate-300 hover:text-red-400 transition-all"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Floating Modal for Creating Note */}
            {createNote && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
                    <div className="bg-slate-900/80 border border-white/10 backdrop-blur-xl p-8 rounded-3xl w-full max-w-md shadow-2xl">
                        <h3 className="text-xl font-bold mb-6">Create New Note</h3>
                        <form onSubmit={HandleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Note Title"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                required
                            />
                            <textarea
                                name="content"
                                rows="4"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Write your thoughts..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                                required
                            />
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
                                >
                                    Save Note
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCreateNote(false)}
                                    className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Responsive Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <div
                            key={note.id}
                            className="group relative bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                                    {note.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed line-clamp-4">
                                    {note.content}
                                </p>
                            </div>

                            <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                                <button onClick={() => handleDelete(note.id)} className="text-xs font-semibold text-slate-500 hover:text-red-400 transition-colors uppercase tracking-widest">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-white/10 rounded-3xl">
                        <p className="text-slate-500">No notes found. Create your first one above!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notes;