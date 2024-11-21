# README - Docker Swarm Deployment Guide

## Introduction

Ce fichier **README** explique comment déployer une application front-end React et back-end en utilisant **Docker Swarm**. Vous apprendrez à construire le front-end, configurer et démarrer Docker Swarm, et accéder à l'application via votre navigateur.

---

## Prérequis

Avant de commencer, assurez-vous que votre environnement dispose des éléments suivants :

1. **Node.js** et **npm** installés (pour construire le front-end).
2. **Docker** installé, avec **Docker Desktop** si vous êtes sur Windows/Mac.
3. Fichier `config/db_password.txt` contenant le mot de passe de votre base de données.

---

## Étapes de déploiement

### 1. Construction du front-end
Le front-end de l'application doit être construit avant de créer l'image Docker.

1. Naviguez vers le dossier du projet contenant le code source du front-end.
2. Exécutez la commande suivante pour construire le front-end :  
   ```bash
   npm run build
   ```
### 2. Initialiser Docker Swarm
Initialisez Docker Swarm sur votre machine pour orchestrer les conteneurs. Dans votre terminal, exécutez :
```bash
docker swarm init
```
### 3. Construire les images Docker
Une fois le Swarm initialisé, construisez les images Docker définies dans le fichier docker-compose.yml :

```bash
docker-compose build
```
### 4. Déployer avec Docker Stack
Déployez la pile de conteneurs à l'aide de Docker Stack :

```bash
docker stack deploy -c docker-compose.yml myStack
```
### 5. Créer le secret pour la base de données
Ajoutez le mot de passe de la base de données à Docker en tant que secret :

```bash
docker secret create db_password config/db_password.txt
```
### 6. Vérification des conteneurs, volumes et images
Vous pouvez vérifier les conteneurs, volumes et images via Docker Desktop ou en utilisant les commandes Docker suivantes :

Pour les conteneurs actifs :
```bash
docker ps
```
Pour les volumes :
```bash
docker volume ls
```
Pour les images :
```bash
docker images
```
### 7. Accès à l'application

Back-end : http://localhost:5000
Front-end : http://localhost:3000

### Informations supplémentaires
Si vous rencontrez des erreurs lors de la configuration ou du déploiement, vérifiez les logs des services :
```bash
docker service logs [nom_du_service]
```
Pour stopper le Swarm :
```bash
docker stack rm myStack
```
Pour quitter le mode Swarm :
```bash
docker swarm leave --force
```

### Notes 
Normalement pour raison de sécurité, créer le db_password du fichier config/db_password.txt de façon manuelle sans le push sur git, je l'ai ici fait pour rendre le processus plus rapide.
