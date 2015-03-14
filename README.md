# A simple student and signature manager System in AngularJS/Nodejs


This project has the backend RestAPI  made with node.js/LoopBack/mongodb with two collectios:

collection estudiantes: /api/estudiantes
[{
    "nombre":"Bill Gates",
    "edad":"59",
    "telefono":"3425645",
    "signatures": [{ 
                    "nombre":"Ingeniería de Software I",
                    "id":"54feedb0cdbff48523bb3f97"
                  }],
    "id":"54feec8bcdbff48523bb3f93"},
  {
    "nombre":"Henry Orjuela",
    "edad":"27",
    "telefono":"2683456",
    "signatures":[],
    "id":"54feecddcdbff48523bb3f96"},
  {
    "nombre":"carlos slim",
    "edad":"70",
    "telefono":"53525352",
    "id":"550178c6b883d8531f55d353"
  }]
collection materias: /api/materias
[{
  "nombre":"Gestión Tecnológica",
  "id":"54feecb1cdbff48523bb3f94"},
  {
  "nombre":"Ciencias de la Computación II",
  "id":"54feeccacdbff48523bb3f95"},
  {
  "nombre":"Ingeniería de Software I",
  "id":"54feedb0cdbff48523bb3f97"},
  {
  "nombre":"Ingeniería de Software II",
  "id":"54feedb7cdbff48523bb3f98"},
  {
  "nombre":"Ciencias de la Computación I",
  "id":"54fef2cacdbff48523bb3f99"},
  {
  "nombre":"auditoria I","id":"550178e4b883d8531f55d354"}]
