import type { DirectusFile } from "@directus/sdk";

export interface Schema {
  content: Content;
  content_translations: ContentTranslation[];
  languages: Language[];
  projects: Project[];
  projects_skills: ProjectSkill[];
  projects_translations: ProjectTranslation[];
  skills: Skill[];
  skills_categories: SkillCategory[];
  skills_categories_translations: SkillCategoryTranslation[];
  work_experience: WorkExperience[];
  work_experience_translations: WorkExperienceTranslation[];
}

export interface Content {
  id: string;
  email: string;
  github_link: string;
  linked_in_link: string;
  discord_link: string;
  translations: string[] | ContentTranslation[];
}

export interface ContentTranslation {
  id: number;
  content_id: string | Content | null;
  languages_code: string | Language | null;
  jumbotron_header_html: string;
  jumbotron_description: string;
  jumbotron_cta_text: string;
  skills_header: string;
  work_experience_header: string;
  projects_header: string;
  contact_header: string;
  footer_message: string;
  download_cv_button_text: string;
  cv: string | DirectusFile<Schema>;
  link_to_project_text: string;
  link_to_source_code_text: string;
  navbar_home_text: string;
  navbar_skills_text: string;
  navbar_experience_text: string;
  navbar_projects_text: string;
  navbar_contacts_text: string;
  name: string;
  present_text: string;
}

export interface Language {
  code: string;
  name: string | null;
  direction: "ltr" | "rtl" | null;
}

export interface Project {
  id: string;
  status: "published" | "draft" | "archived";
  sort: number | null;
  mockup: string | DirectusFile<Schema>;
  name: string;
  translations: string[] | ProjectTranslation[];
  skills: string[] | ProjectSkill[];
}

export interface ProjectSkill {
  id: number;
  projects_id: string | Project | null;
  skills_id: string | Skill | null;
}

export interface ProjectTranslation {
  id: number;
  projects_id: string | Project | null;
  languages_code: string | Language | null;
  description: string;
}

export interface Skill {
  id: string;
  sort: number | null;
  name: string;
  icon: string | DirectusFile<Schema>;
  category: string | SkillCategory | null;
}

export interface SkillCategory {
  id: string;
  sort: number | null;
  icon: string;
  translations: string[] | SkillCategoryTranslation[];
}

export interface SkillCategoryTranslation {
  id: number;
  skills_categories_id: string | SkillCategory | null;
  languages_code: string | Language | null;
  category_title: string;
}

export interface WorkExperience {
  id: number;
  status: "published" | "draft" | "archived";
  sort: number | null;
  start_date: string;
  logo: string | DirectusFile<Schema>;
  end_date: string | null;
  translations: number[] | WorkExperienceTranslation[];
}

export interface WorkExperienceTranslation {
  id: number;
  work_experience_id: number | WorkExperience | null;
  languages_code: string | Language | null;
  company_name: string;
  work_description: string;
  job_title: string;
  location_1: string;
  location_2: string;
}

// GeoJSON Types

export interface GeoJSONPoint {
  type: "Point";
  coordinates: [number, number];
}

export interface GeoJSONLineString {
  type: "LineString";
  coordinates: Array<[number, number]>;
}

export interface GeoJSONPolygon {
  type: "Polygon";
  coordinates: Array<Array<[number, number]>>;
}

export interface GeoJSONMultiPoint {
  type: "MultiPoint";
  coordinates: Array<[number, number]>;
}

export interface GeoJSONMultiLineString {
  type: "MultiLineString";
  coordinates: Array<Array<[number, number]>>;
}

export interface GeoJSONMultiPolygon {
  type: "MultiPolygon";
  coordinates: Array<Array<Array<[number, number]>>>;
}

export interface GeoJSONGeometryCollection {
  type: "GeometryCollection";
  geometries: Array<
    | GeoJSONPoint
    | GeoJSONLineString
    | GeoJSONPolygon
    | GeoJSONMultiPoint
    | GeoJSONMultiLineString
    | GeoJSONMultiPolygon
  >;
}
