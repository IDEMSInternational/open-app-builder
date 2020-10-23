import { ChatAttachment, ChatMessage, IRapidProMessage } from './chat-msg.model';

export function convertFromRapidProMsg(rpMsg: IRapidProMessage): ChatMessage {
    let quickReplies: string[] = [];
    if (Array.isArray(rpMsg.quick_replies)) {
      quickReplies = rpMsg.quick_replies
    } else {
      try {
        quickReplies = JSON.parse(rpMsg.quick_replies);
      } catch (ex) {
        quickReplies = [];
      }
    }
    return {
      text: rpMsg.message,
      sender: "bot",
      dateReceived: new Date(),
      responseOptions: quickReplies.map((choice) => ({ text: choice })),
      attachments: convertRapidProAttachments(rpMsg.attachments)
    };
}

export function convertRapidProAttachments(attachments: string[]): ChatAttachment[] {
    if (!attachments) {
        return [];
    }
    return attachments.map((attachmentString) => {
        let regex = /(?<type>[a-z]*)[\/]?[a-z+]*:(?<url>.*)/gm;
        let results = regex.exec(attachmentString);
        let type = "other";
        switch (results.groups.type) {
            case "image": type = "image"; break;
            case "video": type = "video"; break;
            case "audio": type = "audio"; break;
            default: type = "other";
        }
        return {
            type: type as any,
            url: results.groups.url
        };
    });
}