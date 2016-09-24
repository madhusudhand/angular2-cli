// using: regex, capture groups, and capture group variables.
const templateUrlRegex = /templateUrl *:(.*)$/gm;
// const stylesRegex = /styleUrls *:(\s*\[[^\]]*?\])/g;
const stringRegex = /(['"])((?:[^\\]\\\1|.)*?)\1/g;

function replaceStringsWithRequires(string) {
  return string.replace(stringRegex, (match, quote, url) => {
    const fullUrl = url.charAt(0) !== '.' ? `./${url}` : url;
    // return fullUrl;
    // console.log(url);
    // console.log("require('" + fullUrl + "')");
    return `require('${fullUrl}')`;
    // return "require('" + fullUrl + "')";

    // return "require('" + fullUrl + "')";
  });

  // string.replace(stringRegex, function (match, quote, url) {
  //   console.log(url);
  // });
  //
  // return string;
}

module.exports = (source, sourcemap) => {
  // const loader = this;
  // Not cacheable during unit tests;
  if (this.cacheable) {
    this.cacheable();
  }

  const newSource = source.replace(
                      templateUrlRegex,
                      (match, url) => `template: ${replaceStringsWithRequires(url)}`
                    );
  //  .replace(stylesRegex, function (match, urls) {
  //    // replace: stylesUrl: ['./foo.css', "index.component.css"]
  //    // with: styles: [require('./foo.css'), require("./index.component.css")]
  //    return "styleUrls:" + url; // replaceStringsWithRequires(urls);
  //  });

  // Support for tests
  if (this.callback) {
    this.callback(null, newSource, sourcemap);
  }
  // else {
  return newSource;
  // }
};
