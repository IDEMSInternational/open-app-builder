const { transform } = require("enketo-transformer");
const fs = require("fs");

async function main() {
  const formNames = fs.readdirSync("./forms").filter((p) => p.endsWith(".xml"));
  for (const formName of formNames) {
    const xform = fs.readFileSync(`./forms/${formName}`, "utf-8");
    const convertedForm = await convertForm(xform);
    const outputName = formName.replace(".xml", ".json");
    fs.writeFileSync(`./forms/${outputName}`, JSON.stringify(convertedForm, null, 2), "utf-8");
  }
}

async function convertForm(xform) {
  return transform({
    // required string of XForm
    xform: xform,

    // optional string, to add theme if no theme is defined in the XForm
    theme: "grid",

    // optional map, to replace jr://..../myfile.png URLs
    // media: {
    //   "myfile.png": "/path/to/somefile.png",
    //   "myfile.mp3": "/another/path/to/2.mp3",
    // },

    // optional ability to disable markdown rendering (default is true)
    markdown: false,

    // optional preprocess function that transforms the XForm (as libXMLJs object) to
    // e.g. correct incompatible XForm syntax before Enketo's transformation takes place
    preprocess: (doc) => doc,
  });
}

main()
  .then((res) => {
    console.log(res);
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
