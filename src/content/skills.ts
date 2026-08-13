/**
 * Skills — design.md §5, rendered as a datasheet-style table.
 *
 * **No proficiency rating.** This began as a "characteristics" block rating
 * each skill Deep/Proficient/Working, was cut, and was reinstated without the
 * ratings. A rating is a claim that invites argument; "where this was used" is
 * evidence and needs no defending. Adding a rating column back is a design.md
 * change, not an implementation detail.
 *
 * Source: me.md §Skills. Grouped so the table can be skimmed by area.
 */

export interface Skill {
  name: string;
  /** The "conditions" column: where this was actually used. */
  usedIn: string;
}

export interface SkillGroup {
  group: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    group: "Languages",
    skills: [
      { name: "Python", usedIn: "ROS2 path planning, EarningsIQ, coursework" },
      { name: "C / C++", usedIn: "Concurrent systems — C++17, POSIX threads" },
      {
        name: "TypeScript / JavaScript",
        usedIn: "Neurish, portfolio tracker, this site",
      },
      { name: "Java", usedIn: "Object-oriented software engineering" },
    ],
  },
  {
    group: "Systems",
    skills: [
      {
        name: "Concurrency",
        usedIn: "Multithreaded strace analyser, disk device driver",
      },
      { name: "Real-time systems", usedIn: "UGRacing live control loop" },
      { name: "ROS2", usedIn: "UGRacing autonomous vehicle" },
      { name: "Networking & protocols", usedIn: "Networked systems" },
    ],
  },
  {
    group: "Web & data",
    skills: [
      { name: "React", usedIn: "Neurish, hackathon work" },
      { name: "Node.js / Express", usedIn: "Portfolio tracker" },
      { name: "Django", usedIn: "Hackathon work" },
      { name: "Supabase / MongoDB", usedIn: "Neurish, portfolio tracker" },
    ],
  },
  {
    group: "Machine learning",
    skills: [
      { name: "FinBERT / NLP sentiment", usedIn: "EarningsIQ" },
      { name: "Wav2Vec2 / Librosa", usedIn: "EarningsIQ vocal stress features" },
    ],
  },
  {
    group: "Electronics",
    skills: [
      { name: "Analogue electronics", usedIn: "Analogue electronics, circuits" },
      {
        name: "Digital & embedded",
        usedIn: "Embedded processors, digital electronics",
      },
      { name: "Control systems", usedIn: "Control 3" },
      { name: "Signals & communications", usedIn: "Communication systems 3" },
    ],
  },
];
