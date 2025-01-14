/************************************************************************************
 * (c) 2015-2017 Master Technology
 * Licensed under the MIT license or contact me for a support, changes, enhancements,
 * and/or if you require a commercial licensing
 *
 * Any questions please feel free to email me or put a issue up on github
 * Nathan@master-technology.com                           http://nativescript.tools
 * Version 0.1.7 - iOS
 ***********************************************************************************/

"use strict";
var fs = require('file-system');

/* jshint undef: true, camelcase: false */
/* global Promise, NSFileManager, NSBundle, NSString, interop, sqlite3_open_v2, sqlite3_close, sqlite3_prepare_v2, sqlite3_step,
 sqlite3_finalize, sqlite3_bind_null, sqlite3_bind_text, sqlite3_column_type, sqlite3_column_int64,
 sqlite3_column_double, sqlite3_column_text,  sqlite3_column_count, sqlite3_column_name */


/***
 * Creates a Cursor Tracking Statement for reading result sets
 * @param statement
 * @param resultType
 * @param valuesType
 * @constructor
 */
function CursorStatement(statement, resultType, valuesType) {
    this.statement = statement;
    this.resultType = resultType;
    this.valuesType = valuesType;
    this.built = false;
    this.columns = [];
}

//noinspection JSValidateJSDoc
/***
 * Database Constructor
 * @param dbname - Database Name
 * @param options - options
 * @param callback - Callback when Done
 * @returns {Promise} object
 * @constructor
 */
function Database(dbname, options, callback) {
    if (!this instanceof Database) { // jshint ignore:line
        //noinspection JSValidateTypes
        return new Database(dbname, options, callback);
    }
    this._isOpen = false;
    this._resultType = Database.RESULTSASARRAY;
    this._valuesType = Database.VALUESARENATIVE;

    if (typeof options === 'function') {
        callback = options;
        options = {};
    } else {
        options = options || {};
    }

    // Check to see if it has a path, or if it is a relative dbname
    // DBNAME = "" - is a Temporary Database
    // DBNAME = ":memory:" - is a Memory only database
    if (dbname !== "" && dbname !== ":memory:") {
        var path;
        if (dbname.indexOf('/') === -1) {
            path = fs.knownFolders.documents().path;
            dbname = path + '/' + dbname;
        } else {
            path = dbname.substr(0, dbname.lastIndexOf('/') + 1);
        }

        // Create "databases" folder if it is missing.  This causes issues on Emulators if it is missing
        // So we create it if it is missing

        try {
            if (!fs.File.exists(path)) {
                //noinspection JSUnresolvedFunction
                var fileManager = iosProperty(NSFileManager, NSFileManager.defaultManager);
                if (!fileManager.createDirectoryAtPathWithIntermediateDirectoriesAttributesError(path, true, null, null)) {
                    console.warn("SQLITE.CONSTRUCTOR - Creating DB Folder Error");
                }
            }
        }
        catch (err) {
            console.warn("SQLITE.CONSTRUCTOR - Creating DB Folder Error", err);
        }
    }
    var self = this;
    //noinspection JSUnresolvedFunction
    return new Promise(function (resolve, reject) {
        var error;
        try {
        	var flags = 0;
        	if (typeof options.iosFlags !== 'undefined') {
        		flags = options.iosFlags;
			}

            self._db = new interop.Reference();
            // SQLITE_OPEN_FULLMUTEX = 65536, SQLITE_OPEN_CREATE = 4, SQLITE_OPEN_READWRITE = 2 --- 4 | 2 | 65536 = 65542
            if (options && options.readOnly) {
                error = sqlite3_open_v2(dbname, self._db, 65536 | flags, null);
            } else {
                error = sqlite3_open_v2(dbname, self._db, 65542 | flags, null);
            }
            self._db = self._db.value;
        } catch (err) {
            if (callback) { callback(err, null); }
            reject(err);
            return;
        }
        if (error) {
            if (callback) { callback(error, null); }
            reject(error);
            return;
        }

        self._isOpen = true;
        if (callback) { callback(null, self); }
        resolve(self);
    });
}

/***
 * Constant that this structure is a sqlite structure
 * @type {boolean}
 */
Database.prototype._isSqlite = true;

/***
 * This gets or sets the database version
 * @param valueOrCallback to set or callback(err, version)
 * @returns Promise
 */
Database.prototype.version = function(valueOrCallback) {
    if (typeof valueOrCallback === 'function') {
        return this.get('PRAGMA user_version', function (err, data) {
            valueOrCallback(err, data && data[0]);
        }, Database.RESULTSASARRAY);
    } else if (!isNaN(valueOrCallback+0)) {
        return this.execSQL('PRAGMA user_version='+(valueOrCallback+0).toString());
    } else {
        return this.get('PRAGMA user_version', undefined, undefined, Database.RESULTSASARRAY);
    }
};

/***
 * Is the database currently open
 * @returns {boolean} - true if the db is open
 */
Database.prototype.isOpen = function() {
    return this._isOpen;
};

/***
 * Gets/Sets whether you get Arrays or Objects for the row values
 * @param value - Database.RESULTSASARRAY or Database.RESULTSASOBJECT
 * @returns {number} - Database.RESULTSASARRAY or Database.RESULTSASOBJECT
 */
Database.prototype.resultType = function(value) {
    if (value === Database.RESULTSASARRAY) {
        this._resultType = Database.RESULTSASARRAY;
    } else if (value === Database.RESULTSASOBJECT) {
        this._resultType = Database.RESULTSASOBJECT;
    }
    return this._resultType;
};

/***
 * Gets/Sets whether you get Native or Strings for the row values
 * @param value - Database.VALUESARENATIVE or Database.VALUESARESTRINGS
 * @returns {number} - Database.VALUESARENATIVE or Database.VALUESARESTRINGS
 */
Database.prototype.valueType = function(value) {
    if (value === Database.VALUESARENATIVE) {
        this._valuesType = Database.VALUESARENATIVE;
    } else if (value === Database.VALUESARESTRINGS) {
        this._valuesType = Database.VALUESARESTRINGS;
    }
    return this._resultType;
};

/**
 * Dummy transaction function for public version
 * @param callback
 * @returns {Promise<T>}
 */
Database.prototype.begin = function(callback) {
    throw new Error("Transactions are a Commercial version feature.");
};

/***
 * Closes this database, any queries after this will fail with an error
 * @param callback
 * @returns Promise
 */
Database.prototype.close = function(callback) {

    var self = this;
    return new Promise( function (resolve, reject) {
        if (!self._isOpen) {
            if (callback) {
                callback('SQLITE.CLOSE - Database is already closed');
            }
            reject('SQLITE.CLOSE - Database is already closed');
            return;

        }

        sqlite3_close(self._db);
        self._db = null;
        self._isOpen = false;
        if (callback) {
            callback(null, null);
        }
        resolve();
    });
};

/***
 * Exec SQL
 * @param sql - sql to use
 * @param params - optional array of parameters
 * @param callback - (err, result) - can be last_row_id for insert, and rows affected for update/delete
 * @returns Promise
 */
Database.prototype.execSQL = function(sql, params, callback) {
    if (typeof params === 'function') {
        callback = params;
        params = undefined;
    }

    var self = this;
    return new Promise( function(resolve, reject) {

        var hasCallback = true;
        if (typeof callback !== 'function') {
            callback = reject;
            hasCallback = false;
        }

        if (!self._isOpen) {
            callback("SQLITE.EXECSQL - Database is not open");
            return;
        }

        // Need to see if we have to run any status queries afterwords
        var flags = 0;
        var test = sql.trim().substr(0, 7).toLowerCase();
        if (test === 'insert ') {
            flags = 1;
        } else if (test === 'update ' || test === 'delete ') {
            flags = 2;
        }


        var res;
        try {
            var statement = new interop.Reference();
            res = sqlite3_prepare_v2(self._db, sql, -1, statement, null);
            statement = statement.value;
            if (res) {
                callback("SQLITE.ExecSQL Failed Prepare: " + res);
                return;
            }
            if (params !== undefined) {
                if (!self._bind(statement, params)) {
                    callback("SQLITE.ExecSQL Bind Error");
                    return;
                }
            }
            var result = sqlite3_step(statement);
            sqlite3_finalize(statement);
            if (result && result !== 100 && result !== 101) {
                callback("SQLITE.ExecSQL Failed " + res);
                return;
            }

        } catch (Err) {
            callback(Err, null);
            return;
        }


        switch (flags) {
            case 0:
                if (hasCallback) {
                    callback();
                }
                resolve();
                break;

            case 1:
                self.get('select last_insert_rowid()', function (err, data) {
                    if (hasCallback) {
                        callback(err, data && data[0]);
                    }
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data && data[0]);
                    }
                }, Database.RESULTSASARRAY | Database.VALUESARENATIVE);
                break;

            case 2:
                self.get('select changes()', function (err, data) {
                    if (hasCallback) {
                        callback(err, data && data[0]);
                    }
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data && data[0]);
                    }
                }, Database.RESULTSASARRAY | Database.VALUESARENATIVE);
                break;

            default:
                if (hasCallback) {
                    callback();
                }
                resolve();
        }
    });
};

/***
 * Get the first record result set
 * @param sql - sql to run
 * @param params - optional
 * @param callback - callback (error, results)
 * @param mode - allows you to manually override the results set to be a array or object
 * @returns Promise
 */
Database.prototype.get = function(sql, params, callback, mode) {
    if (typeof params === 'function') {
        mode = callback;
        callback = params;
        params = undefined;
    }


    var self = this;
    return new Promise( function (resolve, reject) {
        var hasCallback = true;

        if (typeof callback !== 'function') {
            callback = reject;
            hasCallback = false;
        }

        if (!self._isOpen) {
            callback("SQLITE.GET - Database is not open");
            return;
        }

        var cursor;
        try {
            var statement = new interop.Reference();
            var res = sqlite3_prepare_v2(self._db, sql, -1, statement, null);
            var cursorStatement = new CursorStatement(statement.value, self._resultType, self._valuesType);
            statement = statement.value;
            if (res) {
                callback("SQLITE.GET Failed Prepare: " + res);
                return;
            }
            if (params !== undefined) {
                if (!self._bind(statement, params)) {
                    callback("SQLITE.GET Bind Error");
                    return;
                }
            }
            var result = sqlite3_step(statement);
            if (result === 100) {
                cursor = self._getResults(cursorStatement, mode);
            }
            sqlite3_finalize(statement);
            if (result && result !== 100 && result !== 101) {
                callback("SQLITE.GET - Step Error" + result);
                return;
            }
        } catch (err) {
            callback(err);
            return;
        }

        // No Records
        if (!cursor) {
            if (hasCallback) {
                callback(null, null);
            }
            resolve(null);
            return;
        }

        if (hasCallback) {
            callback(null, cursor);
        }
        resolve(cursor);
    });
};

/***
 * This returns the entire result set in a array of rows
 * @param sql - Sql to run
 * @param params - optional
 * @param callback - (err, results)
 * @returns Promise
 */
Database.prototype.all = function(sql, params, callback) {
    if (typeof params === 'function') {
        callback = params;
        params = undefined;
    }

    var self = this;
    return new Promise(function(resolve, reject) {

        var hasCallback = true;
        if (typeof callback !== 'function') {
            callback = reject;
            hasCallback = false;
        }

        if (!self._isOpen) {
            callback("SQLITE.ALL - Database is not open");
            return;
        }

        var rows = [], res;
        try {
            var statement = new interop.Reference();
            res = sqlite3_prepare_v2(self._db, sql, -1, statement, null);
            var cursorStatement = new CursorStatement(statement.value, self._resultType, self._valuesType);
            statement = statement.value;
            if (res) {
                callback("SQLITE.ALL - Prepare Error " + res);
                return;
            }
            if (params !== undefined) {
                if (!self._bind(statement, params)) {
                    callback("SQLITE.ALL Bind Error");
                    return;
                }
            }
            var result;
            do {
                result = sqlite3_step(statement);
                if (result === 100) {
                    var cursor = self._getResults(cursorStatement);
                    if (cursor) {
                        rows.push(cursor);
                    }
                } else if (result && result !== 101) {
                    sqlite3_finalize(statement);
                    callback("SQLITE.ALL - Database Error" + result);
                    return;
                }
            } while (result === 100);
            sqlite3_finalize(statement);
        } catch (err) {
            callback(err, null);
            return;
        }

        // No Records
        if (rows.length === 0) {
            if (hasCallback) {
                callback(null, []);
            }
            resolve([]);
            return;
        }

        if (hasCallback) {
            callback(null, rows);
        }
        resolve(rows);
    });
};

/***
 * This sends each row of the result set to the "Callback" and at the end calls the complete callback upon completion
 * @param sql - sql to run
 * @param params - optional
 * @param callback - callback (err, rowsResult)
 * @param complete - callback (err, recordCount)
 * @returns {Promise}
 */
Database.prototype.each = function(sql, params, callback, complete) {
    if (typeof params === 'function') {
        complete = callback;
        callback = params;
        params = undefined;
    }

    // Callback is required
    if (typeof callback !== 'function') {
        throw new Error("SQLITE.EACH - requires a callback");
    }

    var self = this;
    return new Promise (function(resolve, reject) {

        // Set the error Callback
        var errorCB = complete || callback;

        var count = 0, res;
        try {

            var statement = new interop.Reference();
            res = sqlite3_prepare_v2(self._db, sql, -1, statement, null);
            var cursorStatement = new CursorStatement(statement.value, self._resultType, self._valuesType);
            statement = statement.value;
            if (res) {
                errorCB("SQLITE.EACH Error in Prepare" + res);
                reject("SQLITE.EACH Error in Prepare" + res);
                return;
            }
            if (params !== undefined) {
                if (!self._bind(statement, params)) {
                    errorCB("SQLITE.EACH Bind Error");
                    reject("SQLITE.EACH Bind Error");
                    return;
                }
            }
            var result;
            do {
                result = sqlite3_step(statement);
                if (result === 100) {
                    var cursor = self._getResults(cursorStatement);
                    if (cursor) {
                        count++;
                        callback(null, cursor);
                    }
                } else if (result && result !== 101) {
                    sqlite3_finalize(statement);
                    errorCB("SQLITE.EACH - Database Error " + result);
                    reject("SQLITE.EACH - Database Error " + result);
                    return;
                }
            } while (result === 100);
            sqlite3_finalize(statement);
        } catch (err) {
            errorCB(err, null);
            reject(err);
            return;
        }

        if (complete) {
            complete(null, count);
        }
        resolve(count);
    });
};

/**
 * Binds the Parameters in a Statement
 * @param statement
 * @param params
 * @private
 */
Database.prototype._bind = function(statement, params) {
    var param, res;
    if (Array.isArray(params)) {
        var count = params.length;
        for (var i=0; i<count; ++i) {
            if (params[i] == null) { // jshint ignore:line
                res = sqlite3_bind_null(statement, i+1);
            } else {
                param = params[i].toString();
                res = sqlite3_bind_text(statement, i+1, param, -1, null );
            }
            if (res) {
                console.error("SQLITE.Binding Error ", res);
                return false;
            }
        }
    } else {
        if (params == null) { // jshint ignore:line
            res = sqlite3_bind_null(statement, 1);
        } else {
            param = params.toString();
            res = sqlite3_bind_text(statement, 1, param, -1, null );
        }
        if (res) {
            console.error("SQLITE.Binding Error ", res);
            return false;
        }
    }
    return true;
};

Database.prototype._getNativeResult = function(statement, column) {
    var resultType = sqlite3_column_type(statement, column);
    switch (resultType) {
        case 1: // Int
            return sqlite3_column_int64(statement, column);
        case 2: // Float
            return sqlite3_column_double(statement, column);
        case 3: // Text
            //noinspection JSUnresolvedFunction
            return NSString.stringWithUTF8String(sqlite3_column_text(statement, column)).toString();
        case 4: // Blob
            return NSData.dataWithBytesLength(sqlite3_column_blob(statement, column), sqlite3_column_bytes(statement, column));
        case 5: // Null
            return null;
        default:
            //noinspection JSUnresolvedFunction
            return NSString.stringWithUTF8String(sqlite3_column_text(statement, column)).toString();
    }
};

Database.prototype._getStringResult = function(statement, column) {
    var resultType = sqlite3_column_type(statement, column);
    switch (resultType) {
        case 1: // Int
            //return sqlite3_column_int(statement, column).toString();
            return NSString.stringWithUTF8String(sqlite3_column_text(statement, column)).toString();
        case 2: // Float
            //return sqlite3_column_double(statement, column).toString();
            return NSString.stringWithUTF8String(sqlite3_column_text(statement, column)).toString();
        case 3: // Text
            //noinspection JSUnresolvedFunction
            return NSString.stringWithUTF8String(sqlite3_column_text(statement, column)).toString();
        case 4: // Blob
            return NSData.dataWithBytesLength(sqlite3_column_blob(statement, column), sqlite3_column_bytes(statement, column));
        case 5: // Null
            return null;
        default:
            //noinspection JSUnresolvedFunction
            return NSString.stringWithUTF8String(sqlite3_column_text(statement, column)).toString();
    }
};

Database.prototype._getResults = function(cursorStatement, mode) {
    var resultType, valueType;
    var statement = cursorStatement.statement;
    var i;

    if (!mode) {
        resultType = cursorStatement.resultType;
        valueType = cursorStatement.valuesType;
    } else {
        resultType = (mode & (Database.RESULTSASARRAY | Database.RESULTSASOBJECT));
        valueType = (mode & (Database.VALUESARENATIVE | Database.VALUESARESTRINGS));
        if (resultType <= 0) {
            resultType = cursorStatement.resultType;
        }
        if (valueType <= 0) {
            valueType = cursorStatement.valuesType;
        }
    }

    // Track this statements information so we don't have to build it each time
    if (!cursorStatement.built) {
        cursorStatement.count = sqlite3_column_count(statement);
        if (resultType === Database.RESULTSASOBJECT) {
            for (i=0;i<cursorStatement.count;i++) {
                //noinspection JSUnresolvedFunction
                var cn =  NSString.stringWithUTF8String(sqlite3_column_name(statement, i)).toString();
                if (!cn || cursorStatement.columns.indexOf(cn) >= 0) {
                    cn = "column"+i;
                }
                cursorStatement.columns.push(cn);
            }
        }
        cursorStatement.built=true;
    }

    var cnt = cursorStatement.count, data;
    if (cnt === 0) { return null; }
    if (resultType === Database.RESULTSASARRAY) {
        data = [];
        if (valueType === Database.VALUESARESTRINGS) {
            for (i = 0; i < cnt; i++) {
                data.push(this._getStringResult(statement, i));
            }
        } else {
            for (i = 0; i < cnt; i++) {
                data.push(this._getNativeResult(statement, i));
            }
        }
        return data;
    } else {
        var colName = cursorStatement.columns;
        data = {};
        if (valueType === Database.VALUESARESTRINGS) {
            for (i = 0; i < cnt; i++) {
                data[colName[i]] = this._getStringResult(statement, i);
            }
        } else {
            for (i = 0; i < cnt; i++) {
                data[colName[i]] = this._getNativeResult(statement, i);
            }
        }
        return data;
    }
};

/***
 * Is this a SQLite object
 * @param obj - possible sqlite object to check
 * @returns {boolean}
 */
Database.isSqlite = function(obj) {
    return obj && obj._isSqlite;
};

Database.exists = function(name) {
    if (name.indexOf('/') === -1) {
        name = fs.knownFolders.documents().path + '/' + name;
    }

    //noinspection JSUnresolvedFunction
    var fileManager = iosProperty(NSFileManager, NSFileManager.defaultManager);

    return fileManager.fileExistsAtPath(name);
};

Database.deleteDatabase = function(name) {
    //noinspection JSUnresolvedFunction
    var fileManager = iosProperty(NSFileManager, NSFileManager.defaultManager);

    var path;
    if (name.indexOf('/') === -1) {
        path = fs.knownFolders.documents().path + '/';
    } else {
        path = name.substr(0, name.lastIndexOf('/') + 1);
        name = name.substr(path.length);
    }

    if (!fileManager.fileExistsAtPath(path + name)) { return; }

    // Need to remove the trailing .sqlite
    var idx = name.lastIndexOf('.');
    if (idx) {
        name = name.substr(0,idx);
    }

    var files = fileManager.contentsOfDirectoryAtPathError(path, null);
    if (!files) {
        return;
    }

    for (var i = 0; i < files.count; i++) {
        var fileName = files.objectAtIndex(i);
        if (fileName.indexOf(name) !== -1) {
            fileManager.removeItemAtPathError(path + fileName, null);
        }
    }
};

Database.copyDatabase = function(name) {
    //noinspection JSUnresolvedFunction

    var fileManager = iosProperty(NSFileManager, NSFileManager.defaultManager);

    var path;
    if (name.indexOf('/') === -1) {
        path = fs.knownFolders.documents().path + '/';
    } else {
        path = name.substr(0, name.lastIndexOf('/') + 1);
        name = name.substr(path.length);
    }

    var source = fs.knownFolders.currentApp().path + '/' + name;
    var destination = path + name;
    fileManager.copyItemAtPathToPathError(source, destination, null);
};


function iosProperty(_this, property) {
    if (typeof property === "function") {
        // xCode < 8
        return property.call(_this);
    } else {
        // xCode >= 8
        return property;
    }
}

// Literal Defines
Database.RESULTSASARRAY  = 1;
Database.RESULTSASOBJECT = 2;
Database.VALUESARENATIVE = 4;
Database.VALUESARESTRINGS = 8;

module.exports = Database;

