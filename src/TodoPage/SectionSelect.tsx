import { GroupSection } from "../Model";

export default function SectionSelect({value, onChange, defaultOption, sections} : SectionSelectProps) {
    return (
      <select value={value} onChange={(event) => onChange(parseInt(event.target.value) ?? null)} className="bg-gray-100 border-none">
        <option value={-1}>{defaultOption}</option>
        {sections.map(item => <option value={item.id}>{item.title}</option>)}
      </select>
    )
  }
  
  interface SectionSelectProps {
    value:number;
    onChange: (id:number) => void;
    defaultOption: string;
    sections: GroupSection[]
  }