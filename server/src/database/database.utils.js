const OPERATORS = ['>=', '<=', '<>', '>', '<'];

function castToUnderline(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const castedKey = key.replace(/.?([A-Z])/g, (x, y) => x[0] + "_" + y.toLowerCase());
    result[castedKey] = value;
  }
  
  return result;
}
function castToCamelCase(obj) {
  const result = {};

  for (const [key, value] of Object.entries(obj)) { 
    const castedKey = key.replace(/\B_([a-z])/g, function (g) { return g[1].toUpperCase(); });
    result[castedKey] = value;
  }
  
  return result;
}

const where = (conditions, firstArgIndex = 1) => {
  const clause = [];
  const args = [];
  let i = firstArgIndex;
  const keys = Object.keys(conditions);
  for (const key of keys) {
    let operator = '=';
    let value = conditions[key];
    if (typeof value === 'string') {
      for (const op of OPERATORS) {
        const len = op.length;
        if (value.startsWith(op)) {
          operator = op;
          value = value.substring(len);
        }
      }
      if (value.includes('*') || value.includes('?')) {
        operator = 'ILIKE';
        value = value.replace(/\*/g, '%').replace(/\?/g, '_');
      }
    }
    clause.push(`${key} ${operator} $${i++}`);
    args.push(value);
  }
  return { clause: clause.join(' AND '), args };
};

const updates = (delta, firstArgIndex = 1) => {
  const clause = [];
  const args = [];
  let i = firstArgIndex;
  const keys = Object.keys(delta);
  for (const key of keys) {
    const value = delta[key];
    clause.push(`${key} = $${i++}`);
    args.push(value);
  }
  return { clause: clause.join(', '), args };
};

module.exports = {
  where,
  updates,
  castToUnderline,
  castToCamelCase,
}