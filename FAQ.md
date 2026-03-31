# Questions

- Pourquoi avoir désactivé Lombok ?
- Problème de MAJ avec docker, obligatoi de relancer en local avec intellij *(ou autre IDE)* ?

# Axes d'améliorations

- Mettre en place liquibase pour suivre les migration *(changelog)* des datas et schema plus q'un script `data.sql`
- Ajouter lombok pour ne plus à avoir écrire du code pratiquement identique *(Constructeur, Getter, Setter, ...)*
- Uitiliser plutôt des `UUID` que des `LONG` pour les id en BDD