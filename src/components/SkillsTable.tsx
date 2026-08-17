import { skillGroups } from "@/content/skills";

/** Group headings are spanning row headers so the grouping reaches a screen
 *  reader rather than being purely visual. No proficiency column — see
 *  src/content/skills.ts. */
export function SkillsTable() {
  return (
    <div className="scroll-x card mt-4">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          Skills, grouped by area, with where each was used
        </caption>
        <thead>
          <tr className="border-b border-border bg-surface-subtle">
            <th scope="col" className="label px-4 py-3">
              Skill
            </th>
            <th scope="col" className="label px-4 py-3">
              Used in
            </th>
          </tr>
        </thead>

        {skillGroups.map((group) => (
          <tbody key={group.group}>
            <tr>
              <th
                scope="colgroup"
                colSpan={2}
                className="label border-b border-border px-4 pt-6 pb-2"
              >
                {group.group}
              </th>
            </tr>

            {group.skills.map((skill) => (
              <tr key={skill.name} className="border-b border-border/60">
                <th
                  scope="row"
                  className="px-4 py-3 font-mono text-small font-normal whitespace-nowrap"
                >
                  {skill.name}
                </th>
                <td className="px-4 py-3 text-small text-text-secondary">
                  {skill.usedIn}
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
