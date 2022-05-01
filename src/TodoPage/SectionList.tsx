import { GroupSection } from "../Model";
import { Section } from "./Section";

export function SectionList({sections, sectionsUpdatedHandler} : SectionListProps) {
    const updateSectionHadler = (section:GroupSection) => {
        let newSectionList = sections.map(item => {
        if(item.id === section.id) item = section;
        return item;
        })

        sectionsUpdatedHandler(newSectionList)
    }

    const deleteSection = (id:number) => {
        let newSectionList = sections.filter(item => { return item.id !== id})
        sectionsUpdatedHandler(newSectionList)
    }

    return (
        <div>
        {sections.map(item => 
            <Section 
                section={item} 
                sectionUpdatedHandler={updateSectionHadler} 
                deleteSectionHandler={deleteSection}
            />
        )}
        </div>
    )
}

interface SectionListProps {
    sections: GroupSection[],
    sectionsUpdatedHandler: (sections:GroupSection[]) => void;
}