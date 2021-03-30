"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileContents = void 0;
const fs = require("fs");
const path = require("path");
const es6Renderer = require("express-es6-template-engine");
const formatting_1 = require("./formatting");
const promisify_1 = require("./promisify");
const fsReaddir = promisify_1.promisify(fs.readdir);
const fsReadFile = promisify_1.promisify(fs.readFile);
const fsExists = promisify_1.promisify(fs.exists);
class FileContents {
    constructor() {
        this.templatesMap = new Map();
    }
    loadTemplates(pathDirectory, templatesMap) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs.existsSync(pathDirectory)) {
                return;
            }
            const tempMap = yield this.getTemplates(pathDirectory);
            for (const [key, value] of tempMap.entries()) {
                try {
                    const compiled = es6Renderer(value, FileContents.TEMPLATE_ARGUMENTS);
                    templatesMap.set(key, compiled);
                }
                catch (e) {
                    console.log(e);
                }
            }
            return templatesMap;
        });
    }
    getTemplates(templatesPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const templatesFiles = yield fsReaddir(templatesPath, 'utf-8');
            // tslint:disable-next-line:ter-arrow-parens
            const templatesFilesPromises = templatesFiles.map((t) => 
            // tslint:disable-next-line:ter-arrow-parens
            fsReadFile(path.join(templatesPath, t), 'utf8').then((data) => [t, data]));
            const templates = yield Promise.all(templatesFilesPromises);
            // tslint:disable-next-line:ter-arrow-parens
            return new Map(templates.map((x) => x));
        });
    }
    loadDirTemplates(pathDirectory) {
        return __awaiter(this, void 0, void 0, function* () {
            const templatesPath = path.join(pathDirectory, FileContents.TEMPLATES_FOLDER);
            if (!fs.existsSync(templatesPath)) {
                return undefined;
            }
            const directories = yield this.getDirTemplates(templatesPath);
            return directories.filter((c) => {
                return !c.endsWith('.tmpl') && !c.endsWith('.json');
            });
        });
    }
    getDirTemplates(templatesPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const templatesFiles = yield fsReaddir(templatesPath, 'utf-8');
            return templatesFiles;
        });
    }
    getTemplateContent(template, config, inputName, loc) {
        return __awaiter(this, void 0, void 0, function* () {
            const paths = loc.dirPath.split(path.sep);
            let relative;
            let find = false;
            for (const item of paths) {
                if (find) {
                    relative = `${relative}/${item}`;
                }
                if (item === 'lib') {
                    find = true;
                    relative = '';
                }
            }
            const templateName = `${template}.tmpl`;
            const upperName = formatting_1.toUpperCase(inputName);
            const args = [inputName, upperName, formatting_1.toPrivateCase(upperName), config.appName, relative];
            // load dynamic templates
            this.localTemplatesMap = new Map();
            this.localTemplatesMap = yield this.loadTemplates(loc.templateDirectory, this.localTemplatesMap);
            let resultTemplate = this.localTemplatesMap && this.localTemplatesMap.has(templateName)
                ? this.localTemplatesMap.get(templateName)(...args)
                : undefined;
            if (!resultTemplate) {
                /// use template from extension
                resultTemplate = this.templatesMap.has(templateName)
                    ? this.templatesMap.get(templateName)(...args)
                    : '';
            }
            return resultTemplate;
        });
    }
}
exports.FileContents = FileContents;
FileContents.TEMPLATES_FOLDER = 'templates';
FileContents.TEMPLATE_ARGUMENTS = 'inputName, upperName, privateName, appName, relative, params';
//# sourceMappingURL=file-contents.js.map