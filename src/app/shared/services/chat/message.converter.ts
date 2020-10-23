import { environment } from 'src/environments/environment';
import { ChatAttachment, ChatMessage, IRapidProMessage } from './chat-msg.model';

export async function convertFromRapidProMsg(rpMsg: IRapidProMessage): Promise<ChatMessage> {
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
    let attachments = await convertRapidProAttachments(rpMsg.attachments);
    return {
      text: rpMsg.message,
      sender: "bot",
      dateReceived: new Date(),
      responseOptions: quickReplies.map((choice) => ({ text: choice })),
      attachments: attachments
    };
}

export async function convertRapidProAttachments(attachments: string[]): Promise<ChatAttachment[]> {
    if (!attachments) {
        return [];
    }
    return Promise.all(attachments.map(async (attachmentString) => {
        let regex = /(?<type>[a-z]*)[\/]?[a-z+]*:(?<url>.*)/gm;
        let results = regex.exec(attachmentString);
        let type = "other";
        switch (results.groups.type) {
            case "image": type = "image"; break;
            case "video": type = "video"; break;
            case "audio": type = "audio"; break;
            default: type = "other";
        }
        let url = results.groups.url;
        let urlRegex = /http[s]?:\/\/(?<domain>[a-zA-Z0-9\.\-\_]*)\/(?<path>[\S]*)/;
        let urlRegexResult = urlRegex.exec(url);
        let domain = urlRegexResult.groups["domain"];
        let path = urlRegexResult.groups["path"];
        if (environment.domains.indexOf(domain) > -1) {
          try {
            let response = await fetch(path, { method: "HEAD" });
            if (response.status === 200) {
              url = path;
            }
          } catch (ex) {
            console.log("HEAD request excetpion ", ex);
          }
        }
        return {
            type: type as any,
            url: url
        };
    }));
}