import { Timestamp } from "firebase/firestore";
import { Role } from "@/utils/context/interface/Auth";

export interface UserAccount {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  photoURL?: string;
  isActive: boolean;
  role: Role;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface NewUser {
  email: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}

//========== Modal Props ============//

export interface DeleteModalProps {
  userToDelete: string | null;
  setUserToDelete: (uid: string | null) => void;
  handleDeleteUser: (uid: string) => Promise<void>;
  deletingUsers: string[];
}

export interface StatusModalProps {
  showStatusModal: boolean;
  setShowStatusModal: (show: boolean) => void;
  selectedUser: UserAccount | null;
  setSelectedUser: (user: UserAccount | null) => void;
  updateUserStatus: (uid: string, currentStatus: boolean) => Promise<void>;
  updatingStatus: string[];
}

//========== Header Props ============//

export interface UserHeaderProps {
  onAddUser: () => void;
}

export interface UserFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: "all" | "active" | "inactive";
  onStatusFilterChange: (value: "all" | "active" | "inactive") => void;
}

export interface EmptyStateProps {
  handleBack: () => void;
}

//========== Table Props ============//

export interface UserTableProps {
  users: UserAccount[];
  onDelete: (uid: string) => void;
  onStatusChange: (uid: string, isActive: boolean) => void;
  deletingUsers: string[];
  updatingStatus: string[];
}

// Modal Props

export interface AddUserModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (user: NewUser) => Promise<void>;
}

export interface DeleteUserModalProps {
  userToDelete: string | null;
  onClose: () => void;
  onConfirm: (uid: string) => Promise<void>;
  deleting: string[];
}

export interface StatusUpdateModalProps {
  show: boolean;
  user: UserAccount | null;
  onClose: () => void;
  onConfirm: (uid: string, currentStatus: boolean) => Promise<void>;
  updating: string[];
}
