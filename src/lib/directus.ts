import { createDirectus, readItems, readSingleton, rest } from "@directus/sdk";
import type { Schema } from "./directus-schema";
import { ensureObject } from "./utils";

export const directus = createDirectus<Schema>(
  import.meta.env.PUBLIC_DIRECTUS_URL,
).with(rest());

export async function getDirectusLanguages() {
  return await directus.request(readItems("languages"))
}

export async function getDirectusContentData(locale: string) {
  return await directus.request(
    readSingleton("content", {
      fields: ["*", { translations: ["*"] }],
      deep: {
        translations: {
          _limit: 1,
          _filter: {
            languages_code: locale,
          },
        },
      },
    }),
  );
}

export type DirectusContentData = Awaited<
  ReturnType<typeof getDirectusContentData>
>;

async function getDirectusSkills() {
  return await directus.request(
    readItems("skills", {
      fields: ["*", { category: ["id"] }],
    }),
  );
}

export async function getDirectusSkillCategories(locale: string) {
  const skills = await getDirectusSkills();

  const categories = await directus.request(
    readItems("skills_categories", {
      fields: ["*", { translations: ["*"] }],
      deep: {
        translations: {
          _limit: 1,
          _filter: {
            languages_code: locale,
          },
        },
      },
    }),
  );

  return categories.map((cat) => ({
    ...cat,
    skills: skills.filter((skill) => {
      if (!skill.category) return false;
      return ensureObject(skill.category).id === cat.id;
    }),
  }));
}

export async function getDirectusWorkExperience(locale: string) {
  const experiences = await directus.request(
    readItems("work_experience", {
      fields: ["*", { translations: ["*"] }],
      deep: {
        translations: {
          _limit: 1,
          _filter: {
            languages_code: locale,
          },
        },
      },
    }),
  );

  return experiences.map((experience) => {
    if (!experience.translations)
      throw new Error(
        `Unable to get ${locale} translations for work experiences.`,
      );

    return {
      ...experience,
      translations: { ...ensureObject(experience.translations[0]) },
    };
  });
}

export async function getDirectusProjects(locale: string) {
  const projects = await directus.request(
    readItems("projects", {
      fields: ["*", { translations: ["*"], skills: ["*"] }],
      deep: {
        translations: {
          _limit: 1,
          _filter: {
            languages_code: locale,
          },
        },
      },
    }),
  );

  const skills = await getDirectusSkills();

  return projects.map((project) => {
    if (!project.translations)
      throw new Error(`Unable to get ${locale} translations for projects.`);
    
    if (!project.skills) 
      throw new Error(`Unable to get skills for projects.`);

    return {
      ...project,
      skills: skills.filter((skill) => !!ensureObject(project.skills!).find(s => ensureObject(s).skills_id === skill.id)),
      translations: {
        ...ensureObject(project.translations[0]),
      },
    };
  });
}
