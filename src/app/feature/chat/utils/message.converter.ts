import { environment } from "src/environments/environment";
import {
  appCustomFields,
  ChatAttachment,
  ChatMessage,
  ChatResponseOption,
  IRapidProMessage,
  ChatAction,
  ChatActionType,
} from "../models";

export type URLParts = {
  url: string;
  protocol: string;
  domain: string;
  port?: number;
  path?: string;
  query?: string;
  fragment?: string;
};

// Navigate to any part of the app
// http://plh-demo1.idems.international/module_list

// Carry out a custom chat action
// http://plh-demo1.idems.international/chat/action/UNLOCK_TOOLBOX?topic=mod_1on1

// Add custom chat message fields
// http://plh-demo1.idems.international/chat/msg-info?isStory=true

export async function convertFromRapidProMsg(rpMsg: IRapidProMessage): Promise<ChatMessage> {
  let quickReplies: string[] = [];
  if (Array.isArray(rpMsg.quick_replies)) {
    quickReplies = rpMsg.quick_replies;
  } else {
    try {
      quickReplies = JSON.parse(rpMsg.quick_replies);
    } catch (ex) {
      quickReplies = [];
    }
  }
  let urlPartsList = getURLSInText(rpMsg.message);
  let attachmentStrings = rpMsg.attachments ? rpMsg.attachments : [];
  attachmentStrings = attachmentStrings.concat(urlsToAttachmentStrings(urlPartsList));
  let attachments = await convertRapidProAttachments(attachmentStrings);
  let text = removeHiddenURLs(rpMsg.message, urlPartsList);
  let actions = getActionsFromURLS(urlPartsList);
  let responseOptions: ChatResponseOption[] = quickReplies.map((qrText) => ({ 
    text: qrText
  }));
  let msg: ChatMessage = {
    text: text,
    sender: "bot",
    dateReceived: new Date(),
    responseOptions: responseOptions,
    attachments: attachments,
    actions: actions,
  };
  msg = applyCustomMessageInfo(urlPartsList, msg);
  if (msg.choiceMediaUrls) {
    msg.responseOptions.forEach((option, idx) => {
      option.imageUrl = 'assets/plh_assets/' + msg.choiceMediaUrls[idx];
      option.hideText = msg.choiceMediaDisplay === "media";
    })
  }
  return msg;
}

export async function convertQuickReply(choiceString: string): Promise<ChatResponseOption> {
  let urlPartsList = getURLSInText(choiceString);
  let text = choiceString;
  let imageUrl: string;
  for (let urlParts of urlPartsList) {
    text = text.replace(urlParts.url, "");
    imageUrl = urlParts.url;
    if (environment.domains.indexOf(urlParts.domain) > -1) {
      try {
        let response = await fetch(urlParts.path, { method: "HEAD" });
        if (response.status === 200) {
          imageUrl = urlParts.path;
        }
      } catch (ex) {
        console.log("HEAD request excetpion ", ex);
      }
    }
    break;
  }
  return {
    text: text,
    imageUrl: imageUrl,
  };
}

export function applyCustomMessageInfo(urlPartsList: URLParts[], msg: ChatMessage) {
  let msgInfoUrlParts = urlPartsList.find((parts) => parts.path.startsWith("/chat/msg-info"));
  if (msgInfoUrlParts) {
    const qParams: Object = queryStringToObject(msgInfoUrlParts.query);
    for (let customField of appCustomFields) {
      if (qParams.hasOwnProperty(customField.key)) {
        const value = decodeURIComponent(qParams[customField.key]);
        switch (customField.type) {
          case "boolean":
            msg[customField.key as string] = value === "true";
            break;
          case "float":
            msg[customField.key as string] = Number.parseFloat(value);
            break;
          case "integer":
            msg[customField.key as string] = Number.parseInt(value);
            break;
          case "array":
          case "object":
            msg[customField.key as string] = JSON.parse(value);
            break;
          default:
            msg[customField.key as string] = value;
        }
      }
    }
  }
  return msg;
}

export function urlsToAttachmentStrings(urlPartsList: URLParts[]): string[] {
  return urlPartsList
    .filter((urlParts) => urlParts.path.startsWith("/media/attachments/"))
    .map((urlParts) => {
      let fileExtensionRegex = /\.[a-z0-9]*$/m;
      switch (fileExtensionRegex.exec(urlParts.path)[0]) {
        case ".mp3":
        case ".ogg":
          return "audio:" + urlParts.url;
        case ".mp4":
        case ".avi":
        case ".mkv":
        case ".webm":
          return "video:" + urlParts.url;
        default:
          return "image:" + urlParts.url;
      }
    });
}

export function getActionsFromURLS(urlPartsList: URLParts[]): ChatAction[] {
  let matchingOurDomain = urlPartsList.filter(
    (urlParts) => environment.domains.indexOf(urlParts.domain) > -1
  );
  let navigationActions: ChatAction[] = matchingOurDomain
    .filter((urlParts) => {
      return (
        environment.chatNonNavigatePaths.findIndex((nonNav) => urlParts.path.startsWith(nonNav)) < 0
      );
    })
    .map((urlParts) => ({
      executed: false,
      type: ChatActionType.NAVIGATE,
      params: urlParts as any,
    }));

  let imperitiveActions = urlPartsList
    .filter((urlParts) => urlParts.path && urlParts.path.toLowerCase().startsWith("/chat/action"))
    .map((urlParts) => queryStringToObject(urlParts.query))
    .filter((paramMap) => paramMap.type && ChatActionType[paramMap.type])
    .map((paramMap) => ({
      executed: false,
      type: paramMap.type as ChatActionType,
      params: paramMap,
    }));
  return [].concat(imperitiveActions, navigationActions);
}

export function queryStringToObject(queryString: string): { [key: string]: string } {
  let params = new URLSearchParams(queryString);
  let paramMap: { [key: string]: string } = {};
  params.forEach((value, key) => {
    paramMap[key] = value;
  });
  return paramMap;
}

export function removeHiddenURLs(text: string, urlPartsList: URLParts[]) {
  let resultText = "" + text;
  for (let urlParts of urlPartsList) {
    if (isHiddenURL(urlParts)) {
      resultText = resultText.replace(urlParts.url, "");
    }
  }
  return resultText;
}

export function isHiddenURL(urlParts: URLParts): boolean {
  if (urlParts.path.startsWith("/media/attachments/")) {
    return true;
  }
  if (environment.domains.indexOf(urlParts.domain.toLowerCase()) > -1) {
    return true;
  }
  return false;
}

export function getURLSInText(text: string): URLParts[] {
  let urlRegex = /(?<protocol>http[s]?):\/\/(?<domain>[a-zA-Z0-9\.\-\_]*)(?:[\:]?(?<port>[0-9]*))(?<path>\/[^?#\s]*)?[\?]?(?:(?<query>[^?#\s]*))?[#]?(?<fragment>[^?#\s]*)?/gm;
  const urls: URLParts[] = [];
  let regexResult: RegExpExecArray;
  while ((regexResult = urlRegex.exec(text))) {
    let urlParts: URLParts = {
      url: regexResult[0],
      protocol: regexResult.groups.protocol,
      domain: regexResult.groups.domain,
      path: regexResult.groups.path,
      query: regexResult.groups.query,
      fragment: regexResult.groups.fragment,
    };
    if (regexResult.groups.port) {
      urlParts.port = Number.parseInt(regexResult.groups.port);
    }
    urls.push(urlParts);
  }
  return urls;
}

export async function convertRapidProAttachments(attachments: string[]): Promise<ChatAttachment[]> {
  if (!attachments) {
    return [];
  }
  return Promise.all(
    attachments.map(async (attachmentString) => {
      console.log("attachmentString", attachmentString);
      let regex = /(?<type>[a-z]*)[\/]?[a-z+]*:(?<url>.*)/gm;
      let results = regex.exec(attachmentString);
      let type = "other";
      console.log("results", results);
      switch (results.groups.type) {
        case "image":
          type = "image";
          break;
        case "video":
          type = "video";
          break;
        case "audio":
          type = "audio";
          break;
        default:
          type = "other";
      }
      let url = results.groups.url;
      let urlRegex = /http[s]?:\/\/(?<domain>[a-zA-Z0-9\.\-\_]*)\/(?<path>[\S]*)/;
      let urlRegexResult = urlRegex.exec(url);
      // Handle local asset
      if (!urlRegexResult) {
        if (!url.startsWith("assets/plh_assets/")) {
          url = `assets/plh_assets/${url}`;
        }
        return { type, url };
      }
      // Handle web asset
      if (urlRegexResult.groups) {
        let domain = urlRegexResult.groups["domain"];
        let path = urlRegexResult.groups["path"];
        if (environment.domains.includes(domain)) {
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
          url: url,
        };
      }
    })
  );
}
