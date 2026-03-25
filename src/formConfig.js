import { FORM_TYPES } from "./constants";

export const formConfig = {

  [FORM_TYPES[0]]: [
    "general",
    "people"
  ],

  [FORM_TYPES[1]]: [
    "general",
    "attachments",
    "people",
    "vehicle"
  ],

  [FORM_TYPES[2]]: [
    "general",
    "attachments",
    "people",
    "vehicle",
    "tools"
  ],

  /* 🔥 AQUI AGREGAMOS MATERIALS */
  [FORM_TYPES[3]]: [
    "general",
    "attachments",
    "people",
    "vehicle",
    "tools",
    "materials" // ✅ NUEVO
  ],

  [FORM_TYPES[4]]: [
    "general",
    "people",
    "vehicle"
  ],

  /* 🔥 SOLO MATERIALES */
  [FORM_TYPES[5]]: [
    "general",
    "people",
    "vehicle",
    "materials" // ✅ NUEVO
  ]

};