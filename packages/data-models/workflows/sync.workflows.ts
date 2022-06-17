import type { IDeploymentWorkflows } from "./workflow.model";
/** Default workflows made available to all deployments */
const workflows: IDeploymentWorkflows = {
  custom: {
    label: "Run WIP subtitles code",
    steps: [
      // {
      //   name: "convert_srt_to_json",
      //   function: async ({ tasks }) => {
      //     const srtPath =
      //       "/Users/Johnny/Documents/IDEMS-parenting-app/parenting-app-ui/packages/app-data/assets/global/plh_video/lets_slow_down.srt";
      //     const subtitlesJson = tasks.subtitles.subtitlesFileToJson({
      //       srtPath,
      //       outputFolder:
      //         "/Users/Johnny/Documents/IDEMS-parenting-app/parenting-app-ui/packages/app-data/assets/global/plh_video",
      //     });
      //     console.log(subtitlesJson);
      //   },
      // },
      // {
      //   name: "compile_translated_subtitles_json",
      //   function: async ({ tasks }) => {
      //     tasks.translate.apply({inputFolder: "/Users/Johnny/Documents/IDEMS-parenting-app/parenting-app-ui/packages/app-data/assets/global/plh_video"})
      //   }
      // }
      // {
      //   name: "translate_vtt",
      //   function: async ({ tasks }) => {
      //     const languageCode = "tz_sw";
      //     const vttPath =
      //       "/Users/Johnny/Documents/IDEMS-parenting-app/parenting-app-ui/packages/app-data/assets/global/plh_video/lets_slow_down.vtt";
      //     await tasks.subtitles.translateVtt(vttPath, languageCode);
      //   },
      // },
      // {
      //   name: "translate_vtt_files",
      //   function: async ({ tasks, config }) => {
      //     await tasks.subtitles.translateAllVttFilesAndSave('tz_sw', config.app_data.translations_output_path, config.app_data.assets_output_path, 'global');
      //   },
      // },
      {
        name: "copy_vtt_files_for_translation",
        function: async ({ tasks, config }) => {
          await tasks.subtitles.copyVttFilesForTranslation(
            config.app_data.assets_output_path,
            "global",
            config.translations.source_strings_path
          );
        },
      },
    ],
  },
  sync: {
    label: "Sync All Content",
    steps: [
      {
        name: "sync_sheets",
        function: async ({ tasks, workflow }) =>
          tasks.workflow.runWorkflow({ name: "sync_sheets", parent: workflow }),
      },
      {
        name: "sync_assets",
        function: async ({ tasks, workflow }) =>
          tasks.workflow.runWorkflow({ name: "sync_assets", parent: workflow }),
      },
    ],
  },
  sync_sheets: {
    label: "Sync Latest Sheets",
    steps: [
      {
        name: "sheets_dl",
        function: async ({ tasks, config }) =>
          tasks.gdrive.download({ folderId: config.google_drive.sheets_folder_id }),
      },
      {
        name: "sheets_process",
        function: async ({ tasks, workflow }) =>
          tasks.template.process({ inputFolder: workflow.sheets_dl.output }),
      },
      {
        name: "translations_apply",
        function: async ({ tasks, workflow }) =>
          tasks.translate.apply({ inputFolder: workflow.sheets_process.output }),
      },
      {
        name: "translations_copy_for_export",
        function: async ({ tasks, workflow }) =>
          tasks.translate.copyContentForTranslators({
            inputFolder: workflow.sheets_process.output,
          }),
      },
      {
        name: "app_copy_sheets",
        function: async ({ tasks, workflow, config }) =>
          tasks.appData.copy({
            localSheetsFolder: workflow.translations_apply.output.sheets,
            localTranslationsFolder: workflow.translations_apply.output.strings,
            appSheetsFolder: config.app_data.sheets_output_path,
            appTranslationsFolder: config.app_data.translations_output_path,
          }),
      },
    ],
  },
  sync_assets: {
    label: "Sync Latest Assets",
    steps: [
      {
        name: "assets_dl",
        function: async ({ tasks, config }) =>
          tasks.gdrive.download({ folderId: config.google_drive.assets_folder_id }),
      },
      {
        name: "app_copy_add_data",
        function: async ({ tasks, workflow, config }) =>
          tasks.appData.copy({
            localAssetsFolder: workflow.assets_dl.output,
            appAssetsFolder: config.app_data.assets_output_path,
          }),
      },
    ],
  },
};

export default workflows;
