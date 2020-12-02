import { Dictionary } from '@fullcalendar/angular';
import { toolboxTopicNames } from '../../src/app/feature/toolbox/data/toolbox-topic-metadata';
import { ToolboxElement, ToolboxExport, ToolboxSection, ToolboxTopic, ToolboxTopicMetadata, ToolboxTopicType } from '../../src/app/feature/toolbox/models/toolbox.model';
import { ToolboxExcelRow, ToolboxExcelSheet } from './plh-spreadsheet.model';

export class ToolboxTranslator {

    private getTopicMetadata(id: string): ToolboxTopicMetadata {
        return toolboxTopicNames.find((topicMetadata) => topicMetadata.type === id);
    }

    public from(toolboxSheets: ToolboxExcelSheet[]): ToolboxExport {
        let topicByType: { [type: string]: ToolboxTopic } = {};
        for (let sheet of toolboxSheets) {
            let topicMetadata = this.getTopicMetadata(sheet.topic_id);
            if (topicMetadata) {
                if (!topicByType[topicMetadata.type]) {
                    topicByType[topicMetadata.type] = {
                        metadata: topicMetadata,
                        contentSections: []
                    }
                }
                topicByType[topicMetadata.type].contentSections.push(this.sheetToContentSection(sheet));
            }
        }
        let topicTypes: ToolboxTopicType[] = Object.keys(topicByType) as ToolboxTopicType[];
        return {
            topics: topicTypes.map((type) => topicByType[type])
        };
    }

    public sheetToContentSection(sheet: ToolboxExcelSheet): ToolboxSection {
        let elements: ToolboxElement[] = [];
        let title = sheet.sheet_name;
        let listElement: ToolboxElement;
        for (let row of sheet.rows) {
            switch (row.type) {
                case "title": {
                    title = row.message_text;
                    break;
                }
                case "core_tip": {
                    elements.push({
                        type: "CORE_TIP",
                        text: row.message_text
                    });
                    break;
                }
                case "list_intro": {
                    listElement = this.createEmptyList();
                    listElement.intro = row.message_text;
                    break;
                }
                case "end_list": {
                    if (listElement) {
                        listElement.items = listElement.items
                            .filter((item) => item.body.length > 0 || item.heading.length > 0)
                        elements.push(listElement);
                    }
                    listElement = null;
                    break;
                }
                case "list_item": {
                    if (!listElement) {
                        listElement = this.createEmptyList();
                    }
                    listElement.items.push({
                        heading: row.message_text,
                        body: ""
                    });
                    break;
                }
                case "text":
                default: {
                    if (listElement) {
                        const lastItem = listElement.items[listElement.items.length - 1];
                        if (lastItem.body.length > 0) {
                            lastItem.body += "\n";
                        }
                        lastItem.body += row.message_text;
                    } else {
                        elements.push({
                            type: "TEXT",
                            text: row.message_text
                        });
                    }
                }
            }
        }
        return {
            elements: elements,
            title: title
        };
    }

    private createEmptyList(): ToolboxElement {
        return {
            type: "LIST",
            intro: "",
            items: [
            ]
        };
    }

    public to(toolboxExport: ToolboxExport): ToolboxExcelSheet[] {
        return [];
    }

}