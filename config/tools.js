const crypto = require("crypto");
const tools = {
  genString: (len) => {
    const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
    let str = "";
    for(let x = 0; x < len; x++ ){
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  },
  encryptString: (str, key, iv) => {
    let cipher = crypto.createCipheriv('aes256', key, iv);
    return cipher.update(str, 'utf8', 'hex') + cipher.final("hex");
  },
  decryptHex: (encryptedHex, key, iv) => {
    let decipher = crypto.createDecipheriv("aes256", key, iv);
    return decipher.update(encryptedHex, "hex", "utf8") + decipher.final("utf8");
  },
  splitURL: (url, toLower = true) => {
    if( toLower ) url = url.toLowerCase();

    return url.split("/").filter(item => Boolean(item));
  },
  getDecryptionTestString: () => {
    // This will serve as a constant that we will use to make sure that sessions haven't been modified
    return "stunning-waffle";
  }
};

module.exports = tools;