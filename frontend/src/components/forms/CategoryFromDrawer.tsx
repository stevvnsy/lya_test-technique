import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "../atoms";
import { Drawer } from "../organisms";
import { type CategoryFormValues, categorySchema } from "../../schemas/category.schema";

interface CategoryFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CategoryFormValues) => void;
  isSubmitting?: boolean;
}

export function CategoryFormDrawer({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}: CategoryFormDrawerProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const submitForm = async (values: CategoryFormValues) => {
    await onSubmit(values);
    reset();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      title="Ajouter une catégorie"
      description="Crée une nouvelle catégorie pour organiser la FAQ."
    >
      <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Nom de la catégorie
          </label>
          <Input
            {...register("name")}
            inputState={errors.name ? "error" : "default"}
            placeholder="Ex: Sécurité"
          />
          {errors.name && (
            <p className="text-xs text-red-600 dark:text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Description
          </label>
          <Textarea
            {...register("description")}
            textareaState={errors.description ? "error" : "default"}
            rows={6}
            placeholder="Décris le contenu de cette catégorie..."
          />
          {errors.description && (
            <p className="text-xs text-red-600 dark:text-red-400">{errors.description.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={handleClose}>
            Annuler
          </Button>
          <Button type="submit" disabled={!isValid || isSubmitting} isLoading={isSubmitting}>
            Créer la catégorie
          </Button>
        </div>
      </form>
    </Drawer>
  );
}
