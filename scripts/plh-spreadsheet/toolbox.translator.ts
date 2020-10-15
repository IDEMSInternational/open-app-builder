import { Dictionary } from '@fullcalendar/angular';
import { toolboxTopicNames } from 'src/app/shared/services/toolbox/toolbox-topic-metadata';
import { ToolboxExport, ToolboxSection, ToolboxTopic, ToolboxTopicMetadata, ToolboxTopicType } from '../../src/app/shared/services/toolbox/toolbox.model';
import { ToolboxExcelSheet } from './plh-spreadsheet.model';

export class ToolboxTranslator {

    private getTopicMetadata(id: string): ToolboxTopicMetadata {
        return toolboxTopicNames.find((topicMetadata) => topicMetadata.type === id);
    }

    public from(toolboxSheets: ToolboxExcelSheet[]): ToolboxExport {
        let topicByType: { [type: string]: ToolboxTopic } = {};
        for (let sheet of toolboxSheets) {
            let topicMetadata = this.getTopicMetadata(sheet.topicId);
            if (topicMetadata) {
                if (!topicByType[topicMetadata.type]) {
                    topicByType[topicMetadata.type] = {
                        metadata: topicMetadata,
                        contentSections: []
                    }
                }
            }
        }
        let topicTypes: ToolboxTopicType[] = Object.keys(topicByType) as ToolboxTopicType[];
        return {
            topics: topicTypes.map((type) => topicByType[type])
        };
    }

    public sheetToContentSection(sheet: ToolboxExcelSheet): ToolboxSection {
        return {
            elements: [],
            title: sheet.sheetName
        };
    }

    public to(toolboxExport: ToolboxExport): ToolboxExcelSheet[] {
        return [];
    }

}