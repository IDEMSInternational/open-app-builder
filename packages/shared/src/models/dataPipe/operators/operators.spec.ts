// https://famous-mathematicians.com/list/
export const testData = {
  names: [
    {
      id: "id_1",
      first_name: "Ada",
      last_name: "Lovelace",
      year_of_birth: 1815,
    },
    {
      id: "id_2",
      first_name: "Blaise",
      last_name: "Pascal",
      year_of_birth: 1623,
    },
    {
      id: "id_3",
      first_name: "Charles",
      last_name: "Babbage",
      year_of_birth: 1791,
    },
    {
      id: "id_4",
      first_name: "Daniel",
      last_name: "Bernoulli",
      year_of_birth: 1700,
    },
  ],
  concat_names: [
    {
      id: "id_5",
      first_name: "Edward",
      last_name: "Lorenz",
      // year_of_birth omitted, additional field added
      additonal_field: "EL",
    },
    {
      id: "id_6",
      first_name: "Felix",
      last_name: "Klein",
      // year_of_birth omitted, additional field added
      additonal_field: "FK",
    },
  ],
  merge_nationality: [
    {
      id: "invalid_id",
      nationality: "German",
    },
    {
      id: "id_1",
      nationality: "British",
      first_name: "override",
    },
    {
      id: "id_2",
      nationality: "French",
    },
  ],
};
