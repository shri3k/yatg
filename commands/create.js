'use strict';

module.exports = {
  "command": "create <manifest>",
  "description": "Creates the scaffolding based on the provided manifest file",
  "action": function(manifest) {
    console.log(manifest);
  }
}
