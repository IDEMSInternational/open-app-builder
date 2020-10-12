import { RapidProFlowExport } from 'src/app/shared/services/chat/offline/rapid-pro-export.model';

export interface ConversationExcelRow {
    Type: 'Start_new_flow' | 'Send_message',
    From?: number | string,
    Condition?: string,
    Condition_Var?: string,
    MessageText: string,
    Media?: string,
    Default_Choice?: string,
    Choice_1?: string,
    Choice_2?: string,
    Choice_3?: string,
    Choice_4?: string,
    Choice_5?: string,
    Choice_6?: string,
    Choice_7?: string,
    Choice_8?: string,
    Choice_9?: string,
    Choice_10?: string,
    NodeUUID?: string,
    rapidProNode?: RapidProFlowExport.Node
}