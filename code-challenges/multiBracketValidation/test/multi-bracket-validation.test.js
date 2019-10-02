const verifyBrackets = require('../multi-bracket-validation');

describe('Multi-bracket-validation', () => {
  it('Will return true if the string is empty', () => {
    expect(verifyBrackets('')).toBeTruthy();
  });

  it('Will return true if the string does not contain any brackets', () => {
    expect(verifyBrackets('this has no brackets')).toBeTruthy();
  });

  it('Will work with parenthesis ()', () => {
    expect(verifyBrackets('()')).toBeTruthy();
    expect(verifyBrackets('(')).toBeFalsy();
    expect(verifyBrackets(')')).toBeFalsy();
  });

  it('Will work with square brackets []', () => {
    expect(verifyBrackets('[]')).toBeTruthy();
    expect(verifyBrackets('[')).toBeFalsy();
    expect(verifyBrackets(']')).toBeFalsy();
  });

  it('Will work with curly braces {}', () => {
    expect(verifyBrackets('{}')).toBeTruthy();
    expect(verifyBrackets('{')).toBeFalsy();
    expect(verifyBrackets('}')).toBeFalsy();
  });

  it('Will even work with angle brackets <>', () => {
    expect(verifyBrackets('<>')).toBeTruthy();
    expect(verifyBrackets('<')).toBeFalsy();
    expect(verifyBrackets('>')).toBeFalsy();
  });

  it('Will work with any combination of brackets (as long as they all have matching open-closed pairs)', () => {
    expect(verifyBrackets('([{<>}])')).toBeTruthy();
    expect(verifyBrackets('{[<>]({[]<>()}){<>}<<>>[[][(({}))][]][()<>]{<>}}'));
  });

  it('Will ignore non-bracket-like characters (a-z, 0-9, etc)', () => {
    expect(verifyBrackets('(2313__+[{asdasd<as123sdf>  123sdas}]_$@!#)')).toBeTruthy();
    expect(verifyBrackets('{[%@<>](@#$@#%@#%{[blah]<1241231%^%$#$%#>()@#$%@#%}){<     >}<FGSDF^#DSF<0asdasd>>[[  ][@#%$#FDS(({}#$^$))][\\\\]][()<>]{<>}}'));
  });
});
