import { resolveUpNextValue } from "./get-up-next.logic";

const defaultFields = {
  child_age_tag: "age_5_9",
  child_age: "7",
  child_gender: "female",
  user_gender: "female",
  user_relationship: "mother",
};

describe("resolveUpNextValue", () => {
  it("should use getFirstItem when the last completed course has no following module", () => {
    const resolution = resolveUpNextValue(
      [
        {
          id: "i_calm_c",
          title: "Mantener la calma cuando hay estrés",
          tag_course: "relation_c",
          number: 3,
          completed_ts: 100,
          tag_list: ["age_5_9"],
        },
        {
          id: "first_mood",
          title: "First mood module",
          tag_course: "mood_c",
          number: 1,
          tag_list: ["age_5_9"],
        },
      ],
      defaultFields,
      [
        { id: "relation_c", title: "Mejorar la relación con mi niña o niño" },
        { id: "mood_c", title: "Mood course" },
      ]
    );

    expect(resolution?.task.id).toBe("first_mood");
    expect(resolution?.value).toEqual({
      course_id: "mood_c",
      course_title: "Mood course",
      module_id: "first_mood",
      module_title: "First mood module",
    });
  });

  it("should return undefined when all modules are complete", () => {
    const resolution = resolveUpNextValue(
      [
        {
          id: "older_completed",
          title: "Older module",
          tag_course: "course_a",
          completed_ts: 1,
          tag_list: ["age_5_9"],
        },
        {
          id: "newer_completed",
          title: "Newer module",
          tag_course: "course_b",
          completed_ts: 2,
          tag_list: ["age_5_9"],
        },
      ],
      defaultFields,
      [{ id: "course_b", title: "Course B" }]
    );

    expect(resolution).toBeUndefined();
  });
});
