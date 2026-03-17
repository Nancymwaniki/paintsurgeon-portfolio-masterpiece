import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { CategoryList } from '@/components/admin/CategoryList';
import { CategoryForm } from '@/components/admin/CategoryForm';
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from '@/hooks/useCategories';
import { Category, CreateCategoryDto, UpdateCategoryDto } from '@/types/image';

export const CategoriesPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

  const { data: categories, isLoading, error } = useCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const handleCreate = (data: CreateCategoryDto) => {
    createMutation.mutate(data, { onSuccess: () => setIsCreateDialogOpen(false) });
  };

  const handleUpdate = (data: UpdateCategoryDto) => {
    if (!editingCategory) return;
    updateMutation.mutate({ id: editingCategory.id, data }, { onSuccess: () => setEditingCategory(null) });
  };

  const handleDelete = () => {
    if (!deletingCategory) return;
    deleteMutation.mutate(deletingCategory.id, { onSuccess: () => setDeletingCategory(null) });
  };

  return (
    <div className="min-h-screen bg-background pt-16 sm:pt-20 pb-16 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center justify-between"
        >
          <div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground uppercase">
              Categories
            </h1>
            <p className="mt-2 text-muted-foreground font-body text-sm">
              Manage image categories for your portfolio
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="font-ui">
            <Plus className="h-4 w-4 mr-2" />
            New Category
          </Button>
        </motion.div>

        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground font-body">Loading categories...</span>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 mb-6">
            <p className="text-destructive font-body text-sm">Failed to load categories. Please try again.</p>
          </div>
        )}

        {categories && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <CategoryList categories={categories} onEdit={setEditingCategory} onDelete={setDeletingCategory} />
          </motion.div>
        )}

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display uppercase">Create Category</DialogTitle>
              <DialogDescription>Add a new category to organize your portfolio images</DialogDescription>
            </DialogHeader>
            <CategoryForm onSubmit={handleCreate} onCancel={() => setIsCreateDialogOpen(false)} isSubmitting={createMutation.isPending} />
          </DialogContent>
        </Dialog>

        <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display uppercase">Edit Category</DialogTitle>
              <DialogDescription>Update category information</DialogDescription>
            </DialogHeader>
            {editingCategory && (
              <CategoryForm category={editingCategory} onSubmit={handleUpdate} onCancel={() => setEditingCategory(null)} isSubmitting={updateMutation.isPending} />
            )}
          </DialogContent>
        </Dialog>

        <AlertDialog open={!!deletingCategory} onOpenChange={() => setDeletingCategory(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-display uppercase">Delete Category</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{deletingCategory?.name}"?
                {deletingCategory?.imageCount && deletingCategory.imageCount > 0 ? (
                  <span className="block mt-2 text-destructive font-medium">
                    This category has {deletingCategory.imageCount} image(s) and cannot be deleted.
                  </span>
                ) : (
                  <span className="block mt-2">This action cannot be undone.</span>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={deleteMutation.isPending || !!(deletingCategory?.imageCount && deletingCategory.imageCount > 0)}
                className="bg-destructive hover:bg-destructive/90"
              >
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
