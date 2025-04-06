import { DeleteConfirmationModalProps } from '@/hooks/dashboard/super-admins/admins/lib/admin';

export default function DeleteConfirmationModal({
    show,
    user,
    isDeleting,
    onConfirm,
    onClose
}: DeleteConfirmationModalProps) {
    if (!show || !user) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[var(--card-bg)] rounded-3xl shadow-xl max-w-md w-full p-6">
                <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
                <p className="mb-6">
                    Are you sure you want to delete the {user.role} &quot;{user.displayName}&quot;? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50 hover:shadow-lg flex items-center gap-2"
                        onClick={() => onConfirm(user.uid)}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Deleting...
                            </>
                        ) : (
                            'Delete'
                        )}
                    </button>
                    <button
                        className="px-4 py-2 hover:text-slate-300 rounded-xl transition-all duration-200 hover:shadow-md"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}