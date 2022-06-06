import { srtToJson } from "../../utils";

const subtitlesFileToJson = async (options: { srtPath: string }) => {
  const subtitlesJson = await srtToJson(options.srtPath);
  console.log("subtitlesJson: ", subtitlesJson);
};

export default { subtitlesFileToJson };
