import { useState } from 'react';
import { Plus } from 'lucide-react';
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
    createMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
      },
    });
  };

  const handleUpdate = (data: UpdateCategoryDto) => {
    if (!editingCategory) return;
    
    updateMutation.mutate(
      { id: editingCategory.id, data },
      {
        onSuccess: () => {
          setEditingCategory(null);
        },
      }
    );
  };

  const handleDelete = () => {
    if (!deletingCategory) return;
    
    deleteMutation.mutate(deletingCategory.id, {
      onSuccess: () => {
        setDeletingCategory(null);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600 mt-2">
              Manage image categories for your portfolio
            </p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Category
          </Button>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading categories...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">
              Failed to load categories. Please try again.
            </p>
          </div>
        )}

        {categories && (
          <CategoryList
            categories={categories}
            onEdit={setEditingCategory}
            onDelete={setDeletingCategory}
          />
        )}

        {/* Create Category Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
              <DialogDescription>
                Add a new category to organize your portfolio images
              </DialogDescription>
            </DialogHeader>
            <CategoryForm
              onSubmit={handleCreate}
              onCancel={() => setIsCreateDialogOpen(false)}
              isSubmitting={createMutation.isPending}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Category Dialog */}
        <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>
                Update category information
              </DialogDescription>
            </DialogHeader>
            {editingCategory && (
              <CategoryForm
                category={editingCategory}
                onSubmit={handleUpdate}
                onCancel={() => setEditingCategory(null)}
                isSubmitting={updateMutation.isPending}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deletingCategory} onOpenChange={() => setDeletingCategory(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Category</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{deletingCategory?.name}"?
                {deletingCategory?.imageCount && deletingCategory.imageCount > 0 ? (
                  <span className="block mt-2 text-red-600 font-medium">
                    Warning: This category has {deletingCategory.imageCount} image(s) assigned.
                    You cannot delete a category with images.
                  </span>
                ) : (
                  <span className="block mt-2">
                    This action cannot be undone.
                  </span>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={
                  deleteMutation.isPending ||
                  (deletingCategory?.imageCount && deletingCategory.imageCount > 0) || false
                }
                className="bg-red-600 hover:bg-red-700"
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
