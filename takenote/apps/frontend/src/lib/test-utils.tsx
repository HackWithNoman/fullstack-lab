import { type ReactElement, type ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { NotesContext } from "@/contexts/notes-context";
import type { UseNotesManagerReturn } from "@/hooks/useNotesManager";

const defaultContextValue: UseNotesManagerReturn = {
  notes: [],
  loading: false,
  filteredNotes: [],
  currentCategoryLabel: "all",
  searchQuery: "",
  setSearchQuery: () => {},
  selectedCategory: "all",
  setSelectedCategory: () => {},
  handleResetFilters: () => {},
  isDialogModelOpen: false,
  closeDialog: () => {},
  isEditMode: false,
  isDeleteDialogOpen: false,
  closeDeleteDialog: () => {},
  isViewDialogOpen: false,
  closeViewDialog: () => {},
  activeNote: null,
  formDefaultValues: {},
  handleOpenCreate: () => {},
  handleOpenEdit: () => {},
  handleOpenView: () => {},
  onSubmit: async () => {},
  handleOpenDelete: () => {},
  handleDeleteConfirm: async () => {},
  isDeleting: false,
};

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  contextValue?: Partial<UseNotesManagerReturn>;
}

function AllProviders({
  children,
  contextValue = {},
}: {
  children: ReactNode;
  contextValue: Partial<UseNotesManagerReturn>;
}) {
  return (
    <NotesContext.Provider value={{ ...defaultContextValue, ...contextValue }}>
      {children}
    </NotesContext.Provider>
  );
}

function renderWithNotesContext(
  ui: ReactElement,
  options?: CustomRenderOptions,
) {
  const { contextValue = {}, ...renderOptions } = options ?? {};
  return render(ui, {
    wrapper: ({ children }) => (
      <AllProviders contextValue={contextValue}>{children}</AllProviders>
    ),
    ...renderOptions,
  });
}

export { renderWithNotesContext };
