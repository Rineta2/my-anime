import { FilterControlsProps } from '@/hooks/dashboard/super-admins/admins/lib/admin';

import { Role } from '@/utils/context/interface/Auth';

export default function FilterControls({ filters, onFilterChange }: FilterControlsProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-background"
                    value={filters.searchTerm}
                    onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
                />
            </div>
            <div className="w-full md:w-48">
                <select
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-background"
                    value={filters.selectedRole}
                    onChange={(e) => onFilterChange({ selectedRole: e.target.value })}
                >
                    <option value="all">All Roles</option>
                    <option value={Role.ADMIN}>Admin</option>
                    <option value={Role.SUPER_ADMIN}>Super Admin</option>
                </select>
            </div>
        </div>
    );
}