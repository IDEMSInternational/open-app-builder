/**
 * Internal representations of XPathResults
 */
export default {
  boolean: (v) => ({ t: "bool", v }),
  number: (v) => ({ t: "num", v }),
  string: (v) => ({ t: "str", v }),
  date: (v) => ({ t: "date", v }),
};
