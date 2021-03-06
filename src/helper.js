/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const Commons = require("@adobe/aem-cs-source-migration-commons");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const configFileName = "aem-migration-config.yaml";
const baseRepoResourcePath = path.join(
    ".",
    "node_modules",
    "@adobe",
    "aem-cs-source-migration-repository-modernizer"
);

function clearOutputFolder(outputFolderPath) {
    // if `output` folder already exists, delete it
    if (fs.existsSync(outputFolderPath)) {
        try {
            Commons.util.deleteFolderRecursive(outputFolderPath);
        } catch (e) {
            throw new Error(`Error while deleting ${outputFolderPath}!`);
        }
        Commons.logger.info(outputFolderPath + " cleaned successfully.");
    }
}

function readConfigFile(configDirPath) {
    let configFilePath = path.join(configDirPath, configFileName);
    if (!fs.existsSync(configFilePath)) {
        throw new Error(`Config file ${configFilePath} not found!`);
    }
    const yamlFile = fs.readFileSync(configFilePath, "utf8");
    return yaml.safeLoad(yamlFile);
}

function createBaseDispatcherConfig(src) {
    Commons.util.copyFolderSync(
        src,
        Commons.constants.TARGET_DISPATCHER_SRC_FOLDER
    );
}

module.exports = {
    baseRepoResourcePath,
    clearOutputFolder,
    createBaseDispatcherConfig,
    readConfigFile,
};
