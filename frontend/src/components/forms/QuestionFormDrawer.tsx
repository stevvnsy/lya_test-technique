import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, Textarea } from "../atoms";
import { Drawer } from "../organisms";
import type { Category } from "../../types/category";
import { type QuestionFormValues, questionSchema } from "../../schemas/question.schema";

interface QuestionFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  initialCategoryId?: number | "";
  onSubmit: (values: QuestionFormValues) => void;
}

export function QuestionFormDrawer({
  isOpen,
  onClose,
  categories,
  initialCategoryId = "",
  onSubmit,
}: QuestionFormDrawerProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    mode: "onChange",
    defaultValues: {
      categoryId: initialCategoryId === "" ? undefined : Number(initialCategoryId),
      question: "",
      answer: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        categoryId: initialCategoryId === "" ? undefined : Number(initialCategoryId),
        question: "",
        answer: "",
      });
    }
  }, [initialCategoryId, isOpen, reset]);

  const selectedCategoryId = watch("categoryId");

  const handleClose = () => {
    reset({
      categoryId: initialCategoryId === "" ? undefined : Number(initialCategoryId),
      question: "",
      answer: "",
    });
    onClose();
  };

  const submitForm = (values: QuestionFormValues) => {
    onSubmit(values);
    reset();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      title="Ajouter une question"
      description="Ajoute une nouvelle question/réponse dans la FAQ."
    >
      <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Catégorie
          </label>

          <Select
            value={selectedCategoryId ?? ""}
            onChange={(event) =>
              setValue("categoryId", Number(event.target.value), {
                shouldValidate: true,
              })
            }
            selectState={errors.categoryId ? "error" : "default"}
          >
            <option value="" disabled>
              Sélectionner une catégorie
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            {selectedCategoryId
              ? "La catégorie est préremplie selon votre sélection actuelle, mais vous pouvez la modifier."
              : "Choisissez la catégorie dans laquelle ajouter la question."}
          </p>

          {errors.categoryId && (
            <p className="text-xs text-red-600 dark:text-red-400">{errors.categoryId.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Question</label>
          <Input
            {...register("question")}
            inputState={errors.question ? "error" : "default"}
            placeholder="Ex: Comment réinitialiser mon mot de passe ?"
          />
          {errors.question && (
            <p className="text-xs text-red-600 dark:text-red-400">{errors.question.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Réponse</label>
          <Textarea
            {...register("answer")}
            textareaState={errors.answer ? "error" : "default"}
            rows={8}
            placeholder="Rédige la réponse complète..."
          />
          {errors.answer && (
            <p className="text-xs text-red-600 dark:text-red-400">{errors.answer.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={handleClose}>
            Annuler
          </Button>
          <Button type="submit" disabled={!isValid}>
            Ajouter la question
          </Button>
        </div>
      </form>
    </Drawer>
  );
}
