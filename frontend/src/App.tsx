import { useEffect, useMemo, useState } from "react";
import { Drawer, QuestionAccordion, SearchOverlay } from "./components/organisms";
import { AppShell } from "./components/templates";
import { Button, Input, Select, Textarea } from "./components/atoms";

type Question = {
  id: number;
  question: string;
  answer: string;
};

type Category = {
  id: number;
  name: string;
  description: string;
  questions: Question[];
};

type SearchResult = {
  id: number;
  question: string;
  answer: string;
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
};

const ALL_CATEGORIES_ID = 0;

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState<number>(ALL_CATEGORIES_ID);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [openQuestionId, setOpenQuestionId] = useState<number | null>(1);
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [isQuestionDrawerOpen, setIsQuestionDrawerOpen] = useState(false);
  const [questionDrawerCategoryId, setQuestionDrawerCategoryId] = useState<number | "">("");

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const [questionTitle, setQuestionTitle] = useState("");
  const [questionAnswer, setQuestionAnswer] = useState("");

  const categories: Category[] = [
    {
      id: 1,
      name: "Général",
      description: "Questions générales sur l'entreprise",
      questions: [
        {
          id: 1,
          question: "Quels sont les horaires d'ouverture ?",
          answer: "Les bureaux sont ouverts de 9h à 18h, du lundi au vendredi.",
        },
        {
          id: 2,
          question: "Comment accéder au parking ?",
          answer: "Le parking est accessible avec votre badge employé au niveau -1.",
        },
        {
          id: 3,
          question: "Où se trouve la cafétéria ?",
          answer: "La cafétéria est située au 2ème étage, ouverte de 11h30 à 14h.",
        },
      ],
    },
    {
      id: 2,
      name: "Technique",
      description: "Questions techniques et IT",
      questions: [
        {
          id: 4,
          question: "Comment me connecter au VPN ?",
          answer:
            "Téléchargez le client VPN depuis l'intranet et utilisez vos identifiants Active Directory.",
        },
        {
          id: 5,
          question: "Qui contacter en cas de panne informatique ?",
          answer: "Envoyez un mail à support@entreprise.com ou appelez le poste 1234.",
        },
        {
          id: 6,
          question: "Comment demander un nouvel équipement ?",
          answer:
            "Faites une demande sur le portail IT en précisant vos besoins et la validation de votre manager.",
        },
        {
          id: 7,
          question: "Comment accéder au GitLab interne ?",
          answer: "Rendez-vous sur gitlab.entreprise.com et connectez-vous avec votre SSO.",
        },
      ],
    },
    {
      id: 3,
      name: "RH",
      description: "Ressources humaines et vie au travail",
      questions: [
        {
          id: 8,
          question: "Comment poser des congés ?",
          answer:
            "Utilisez l'application RH en ligne. Les demandes doivent être soumises 2 semaines à l'avance.",
        },
        {
          id: 9,
          question: "Quelle est la politique de télétravail ?",
          answer: "Jusqu'à 3 jours par semaine en télétravail, à valider avec votre manager.",
        },
        {
          id: 10,
          question: "Comment fonctionne la mutuelle ?",
          answer:
            "La mutuelle entreprise couvre 80% des frais. Les détails sont sur l'intranet RH.",
        },
      ],
    },
  ];

  const sidebarCategories = [
    {
      id: ALL_CATEGORIES_ID,
      name: "Toutes les catégories",
      count: categories.reduce((total, category) => total + category.questions.length, 0),
    },
    ...categories.map((category) => ({
      id: category.id,
      name: category.name,
      count: category.questions.length,
    })),
  ];

  const activeCategory =
    activeCategoryId === ALL_CATEGORIES_ID
      ? null
      : (categories.find((category) => category.id === activeCategoryId) ?? categories[0]);

  const groupedQuestions = useMemo(() => {
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
      questions: category.questions,
    }));
  }, [categories]);

  const allQuestions = categories.flatMap((category) =>
    category.questions.map((question) => ({
      ...question,
      categoryId: category.id,
      categoryName: category.name,
    }))
  );

  const query = searchValue.trim().toLowerCase();

  const groupedSearchResults = useMemo(() => {
    if (!query) {
      return [];
    }

    const groups = categories
      .map((category) => {
        const questions = category.questions
          .filter(
            (item) =>
              item.question.toLowerCase().includes(query) ||
              item.answer.toLowerCase().includes(query)
          )
          .map((item) => ({
            id: item.id,
            question: item.question,
            answer: item.answer,
            categoryId: category.id,
            categoryName: category.name,
            categoryDescription: category.description,
          }));

        return {
          id: category.id,
          name: category.name,
          description: category.description,
          questions,
        };
      })
      .filter((group) => group.questions.length > 0);

    return groups;
  }, [categories, query]);

  const searchResults = useMemo<SearchResult[]>(() => {
    if (!query) {
      return [];
    }

    return categories.flatMap((category) =>
      category.questions
        .filter(
          (item) =>
            item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query)
        )
        .map((item) => ({
          id: item.id,
          question: item.question,
          answer: item.answer,
          categoryId: category.id,
          categoryName: category.name,
          categoryDescription: category.description,
        }))
    );
  }, [categories, query]);

  useEffect(() => {
    if (!query) {
      setIsSearchLoading(false);
      return;
    }

    setIsSearchLoading(true);

    const timeout = window.setTimeout(() => {
      setIsSearchLoading(false);
    }, 350);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [query]);

  useEffect(() => {
    const currentQuestions =
      activeCategoryId === ALL_CATEGORIES_ID ? allQuestions : (activeCategory?.questions ?? []);

    const hasOpenQuestionInView = currentQuestions.some(
      (question) => question.id === openQuestionId
    );

    if (!hasOpenQuestionInView) {
      const firstQuestionId = currentQuestions[0]?.id ?? null;
      setOpenQuestionId(firstQuestionId);
    }
  }, [activeCategoryId, activeCategory, allQuestions, openQuestionId]);

  const handleSelectSearchResult = (result: SearchResult) => {
    setActiveCategoryId(result.categoryId);
    setOpenQuestionId(result.id);
    setSearchValue("");
    setIsSearchOpen(false);
  };

  const shouldShowOverlay = isSearchOpen;

  const handleOpenCategoryDrawer = () => {
    setCategoryName("");
    setCategoryDescription("");
    setIsCategoryDrawerOpen(true);
  };

  const handleCloseCategoryDrawer = () => {
    setIsCategoryDrawerOpen(false);
  };

  const handleOpenQuestionDrawer = () => {
    if (activeCategoryId !== ALL_CATEGORIES_ID) {
      setQuestionDrawerCategoryId(activeCategoryId);
    } else {
      setQuestionDrawerCategoryId("");
    }

    setQuestionTitle("");
    setQuestionAnswer("");
    setIsQuestionDrawerOpen(true);
  };

  const handleCloseQuestionDrawer = () => {
    setIsQuestionDrawerOpen(false);
  };

  const isCategoryFormValid =
    categoryName.trim().length > 0 && categoryDescription.trim().length > 0;

  const isQuestionFormValid =
    questionDrawerCategoryId !== "" &&
    questionTitle.trim().length > 0 &&
    questionAnswer.trim().length > 0;

  const handleCreateCategory = () => {
    if (!isCategoryFormValid) {
      return;
    }

    console.log("Nouvelle catégorie", {
      name: categoryName,
      description: categoryDescription,
    });

    handleCloseCategoryDrawer();
  };

  const handleCreateQuestion = () => {
    if (!isQuestionFormValid) {
      return;
    }

    console.log("Nouvelle question", {
      categoryId: questionDrawerCategoryId,
      question: questionTitle,
      answer: questionAnswer,
    });

    handleCloseQuestionDrawer();
  };

  return (
    <AppShell
      categories={sidebarCategories}
      activeCategoryId={activeCategoryId}
      onSelectCategory={setActiveCategoryId}
      searchValue={searchValue}
      onSearchChange={(value) => {
        setSearchValue(value);
        setIsSearchOpen(true);
      }}
      isSearchOpen={isSearchOpen}
      onOpenSearch={() => setIsSearchOpen(true)}
      onCloseSearch={() => setIsSearchOpen(false)}
      searchOverlay={
        <SearchOverlay
          query={searchValue}
          results={searchResults}
          groupedResults={groupedSearchResults}
          isLoading={isSearchLoading}
          onSelectResult={handleSelectSearchResult}
        />
      }
      actions={
        <>
          <Button variant="secondary" onClick={handleOpenCategoryDrawer}>
            Ajouter une catégorie
          </Button>

          <Button onClick={handleOpenQuestionDrawer}>Ajouter une question</Button>
        </>
      }
    >
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between dark:border-slate-800">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {activeCategoryId === ALL_CATEGORIES_ID ? "Vue globale" : "Catégorie sélectionnée"}
            </p>

            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {activeCategoryId === ALL_CATEGORIES_ID
                ? "Toutes les catégories"
                : activeCategory?.name}
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              {activeCategoryId === ALL_CATEGORIES_ID
                ? "Retrouvez toutes les questions de la FAQ, regroupées par catégorie."
                : activeCategory?.description}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-10">
          {activeCategoryId === ALL_CATEGORIES_ID ? (
            groupedQuestions.map((category) => (
              <section
                key={category.id}
                className="space-y-4 border-t border-slate-200 pt-8 first:border-t-0 first:pt-0 dark:border-slate-800"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {category.name}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {category.description}
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {category.questions.length} question
                    {category.questions.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {category.questions.map((item) => (
                    <QuestionAccordion
                      key={item.id}
                      question={item.question}
                      answer={item.answer}
                      isOpen={openQuestionId === item.id}
                      onToggle={() =>
                        setOpenQuestionId((current) => (current === item.id ? null : item.id))
                      }
                    />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="flex flex-col gap-4">
              {activeCategory?.questions.map((item) => (
                <QuestionAccordion
                  key={item.id}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openQuestionId === item.id}
                  onToggle={() =>
                    setOpenQuestionId((current) => (current === item.id ? null : item.id))
                  }
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Drawer
        isOpen={isCategoryDrawerOpen}
        onClose={handleCloseCategoryDrawer}
        title="Ajouter une catégorie"
        description="Crée une nouvelle catégorie pour organiser la FAQ."
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Nom de la catégorie
            </label>
            <Input
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              placeholder="Ex: Sécurité"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Description
            </label>
            <Textarea
              rows={6}
              value={categoryDescription}
              onChange={(event) => setCategoryDescription(event.target.value)}
              placeholder="Décris le contenu de cette catégorie..."
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {categoryDescription.length} caractère{categoryDescription.length > 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCloseCategoryDrawer}>
              Annuler
            </Button>
            <Button onClick={handleCreateCategory} disabled={!isCategoryFormValid}>
              Créer la catégorie
            </Button>
          </div>
        </div>
      </Drawer>

      <Drawer
        isOpen={isQuestionDrawerOpen}
        onClose={handleCloseQuestionDrawer}
        title="Ajouter une question"
        description="Ajoute une nouvelle question/réponse dans la FAQ."
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Catégorie
            </label>

            <Select
              value={questionDrawerCategoryId}
              onChange={(event) => setQuestionDrawerCategoryId(Number(event.target.value))}
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
              {questionDrawerCategoryId !== ""
                ? "La catégorie est préremplie selon votre sélection actuelle, mais vous pouvez la modifier."
                : "Choisissez la catégorie dans laquelle ajouter la question."}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Question
            </label>
            <Input
              value={questionTitle}
              onChange={(event) => setQuestionTitle(event.target.value)}
              placeholder="Ex: Comment réinitialiser mon mot de passe ?"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Réponse
            </label>
            <Textarea
              rows={8}
              value={questionAnswer}
              onChange={(event) => setQuestionAnswer(event.target.value)}
              placeholder="Rédige la réponse complète..."
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {questionAnswer.length} caractère{questionAnswer.length > 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={handleCloseQuestionDrawer}>
              Annuler
            </Button>
            <Button onClick={handleCreateQuestion} disabled={!isQuestionFormValid}>
              Ajouter la question
            </Button>
          </div>
        </div>
      </Drawer>
    </AppShell>
  );
}

export default App;
