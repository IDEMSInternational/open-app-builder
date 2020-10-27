import { environment } from 'src/environments/environment';
import { ChatAttachment, ChatMessage, IRapidProMessage } from './chat-msg.model';
import { ChatAction, ChatActionType } from './common/chat-actions';

export type URLParts = { url: string, protocol: string, domain: string, port?: number, path?: string, query?: string, fragment?: string };

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
  let urlPartsList = getURLSInText(rpMsg.message);
  let text = removeHiddenURLs(rpMsg.message, urlPartsList);
  let actions = getActionsFromURLS(urlPartsList);
  return {
    text: text,
    sender: "bot",
    dateReceived: new Date(),
    responseOptions: quickReplies.map((choice) => ({ text: choice })),
    attachments: attachments,
    actions: actions
  };
}

export function getActionsFromURLS(urlPartsList: URLParts[]): ChatAction[] {
  let matchingOurDomain = urlPartsList
    .filter((urlParts) => environment.domains.indexOf(urlParts.domain) > -1);
  let navigationActions: ChatAction[] = matchingOurDomain
    .filter((urlParts) => urlParts.fragment && urlParts.fragment.indexOf("goto") > -1)
    .map((urlParts) => ({
      executed: false,
      type: ChatActionType.NAVIGATE,
      params: urlParts as any
    }));

  let imperitiveActions = urlPartsList
    .filter((urlParts) => urlParts.path && urlParts.path.toLowerCase().startsWith("/chat/action"))
    .map((urlParts) => queryStringToObject(urlParts.query))
    .filter((paramMap) => paramMap.type && ChatActionType[paramMap.type])
    .map((paramMap) => ({
      executed: false,
      type: paramMap.type as ChatActionType,
      params: paramMap
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
  if (environment.domains.indexOf(urlParts.domain.toLowerCase()) > -1) {
    for (let hiddenPath of environment.chatHiddenPaths) {
      if (urlParts.path.startsWith(hiddenPath)) {
        return true;
      }
    }
  }
  return false;
}

export function getURLSInText(text: string): URLParts[] {
  let urlRegex = /(?<protocol>http[s]?):\/\/(?<domain>[a-zA-Z0-9\.\-\_]*)(?:[\:]?(?<port>[0-9]*))(?<path>\/[^?#\s]*)?[\?]?(?:(?<query>[^?#\s]*))?[#]?(?<fragment>[^?#\s]*)?/gm;
  const urls: URLParts[] = [];
  let regexResult: RegExpExecArray;
  while (regexResult = urlRegex.exec(text)) {
    let urlParts: URLParts = {
      url: regexResult[0],
      protocol: regexResult.groups.protocol,
      domain: regexResult.groups.domain,
      path: regexResult.groups.path,
      query: regexResult.groups.query,
      fragment: regexResult.groups.fragment
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