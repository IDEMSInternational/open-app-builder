const data: { [source_text: string]: string } = {
  "Example Language Template": "Plantilla de Ejemplo de Idioma",
  "This is a default text that needs to be translated":
    "Esto es un texto predeterminado que necesita ser traducido",
  "How are you feeling today?": "¿Cómo te sientes hoy?",
  "This is the default reply if the feeling response is happy, the first option.":
    "Esta es la respuesta predeterminada si la respuesta es contento, la primera opción.",
  "This is the default reply if the feeling response is ok, the second option.":
    "Esta es la respuesta predeterminada si la respuesta es normal, la segunda opción.",
  "This is the default reply if the feeling response is sad, the third option.":
    "Esta es la respuesta predeterminada si la respuesta es triste, la tercer opción.",
  "The field set through the radio group is @local.radio_group_field_name and its value is @fields.@local.radio_group_field_name.":
    "El campo determinado por medio del grupo radial es @local.radio_group_field_name y su valor es @fields.@local.radio_group_field_name.",
  "Select one of the following options:": "Selecciona una de las siguientes opciones:",
  "This is the first default option for the combo box":
    "Esta es la primera opción de la caja de combinaciones",
  "This is the second default option for the combo box":
    "Esta es la segunda opción de la caja de combinaciones",
  "This is the third default option for the combo box":
    "Esta es la tercer opción de la caja de combinaciones",
  "The option selected was @local.combo_box.": "La opción seleccionada fue @local.combo_box.",
  "The field set through the combo box is @local.combo_box_field_name and its value is @fields.@local.combo_box_field_name.":
    "El campo determinado por medio de la caja de combinaciones es @local.combo_box_field_name y su valor es @fields.@local.combo_box_field_name.",
  "This is a modified text that needs to be translated.\n\nThis is a nested text.":
    "Este es un texto modificado que necesita ser traducido.\n\nEste es un texto anidado.",
  "This is the modified reply if the feeling response is happy, the first option.\n\nThis is a nested text.":
    "Esta es la respuesta modificada si la respuesta es alegre, la primera opción.\n\nEste es un texto anidado.",
  "This is the modified reply if the feeling response is ok, the second option.\n\nThis is a nested text.":
    "Esta es la respuesta modificada si la respuesta es normal, la segunda opción.\n\nEste es un texto anidado.",
  "This is the modified reply if the feeling response is sad, the third option.\n\nThis is a nested text.":
    "Esta es la respuesta modificada si la respuesta es triste, la tercer opción.\n\nEste es un texto anidado.",
  "Which of the following do you like the most (this is modified)?":
    "¿Cuál de los siguientes te gusta más? (esto está modificado)?",
  "Cats (modified text in answer list)": "Gatos (texto modificado en la lista de respuestas)",
  "Dogs (modified text in answer list)": "Perros (texto modificado en la lista de respuestas)",
  "Chinchillas (modified text in answer list)":
    "Chinchillas (texto modificado en la lista de respuestas)",
  "New title: @data.language.example_lang_2.title":
    "Título nuevo: @data.language.example_lang_2.title",
  "New text: @data.language.example_lang_2.text": "Texto nuevo: @data.language.example_lang_2.text",
  "This is a global variable set in a global":
    "Esta es una variable global determinada en una planilla global",
  "This is a field set by default": "Este es un campo con valor predeterminado",
  "<p>Standard Template</p>": "<p>Plantilla estandar</p>",
  "<p>This is a standard template that demonstrates a variety of things that would need to be translated and a few things that are excluded from translation.</p>":
    "<p>Esta es una planilla estandar que demuestra una variedad de cosas que necesitarían ser traducidas y algunas que están excluídas de la traducción.</p>",
  "<p>Nested Template</p>": "<p>Plantilla Anidada</p>",
  "<p>This is a nested template that demonstrates a variety of things that would need to be translated and a few things that are excluded from translation. This will allow us to check that the multi-lingual system works with nesting.</p>":
    "<p>Esta es una planilla anidada que demuestra una variedad de cosas que necesitarían ser traducidas y algunas que están excluídas de la traducción. Esto nos permitirá verificar que el sistema multilingual funciona cuando se anida.</p>",
  "<p>Component to translate</p>": "<p>Componente para traducir</p>",
  "<p>This is an example of a component that requires translation: the placeholder text and the selected option should be translated</p>":
    "<p>Este es un ejemplo de un componente que requiere ser traducido: el marcador de posición u la opción seleccionada deben ser traducidos</p>",
  "<p>Component that should not be translated translate</p>":
    "<p>Component que no debe ser traducido</p>",
  "<p>This is an example of a component that is excluded from translation. The button text should still be Pop-up 1.</p>":
    "<p>Este es un ejemplo de un componente que esta excluído de la traducción. El texto del botón debería mantenerse como Pop-up 1.</p>",
  "Example Data List Title 1": "Ejemplo 1 de Título de Listado de Datos",
  "This text is loaded through the first data row.":
    "Este texto esta cargado por medio de la primera fila de datos.",
  "Example Data List Title 2": "Ejemplo 2 de Título de Listado de Datos",
  "This text is loaded through the second data row.":
    "Este texto esta cargado por medio de la segunda fila de datos.",
  "This text should define a default value for a field":
    "Este texto debería definir el valor predeterminado de un campo.",
  happy: "contento",
  ok: "bien",
  sad: "triste",
  "awesome parent": "Padre asombroso",
  "Audio message": "Mensaje de audio",
};
export default data;
