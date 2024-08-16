(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('case'), require('base64-js'), require('google-protobuf')) :
typeof define === 'function' && define.amd ? define(['exports', 'case', 'base64-js', 'google-protobuf'], factory) :
(global = global || self, factory(global['impresso-jscommons'] = global['impresso-jscommons'] || {}, global.case, global['base64-js'], global.goog));
}(this, (function (exports, _case, base64Js, googleProtobuf) { 'use strict';

_case = _case && Object.prototype.hasOwnProperty.call(_case, 'default') ? _case['default'] : _case;
base64Js = base64Js && Object.prototype.hasOwnProperty.call(base64Js, 'default') ? base64Js['default'] : base64Js;
googleProtobuf = googleProtobuf && Object.prototype.hasOwnProperty.call(googleProtobuf, 'default') ? googleProtobuf['default'] : googleProtobuf;

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const {
  snake,
  camel,
  upper,
  pascal
} = _case;
const {
  fromByteArray,
  toByteArray
} = base64Js;

// While this one is being implemented: https://github.com/protocolbuffers/protobuf/issues/1591
function fromObject(ProtoClass, obj) {
  if (obj === undefined) return undefined;
  const instance = new ProtoClass();
  Object.keys(obj).forEach(property => {
    const setterName = `set${pascal(property)}`;
    const listSetterName = `set${pascal(property)}List`;
    const setter = instance[setterName] || instance[listSetterName];
    if (setter === undefined) throw new Error(`Unknown property: "${property}"`);
    setter.call(instance, obj[property]);
  });
  return instance;
}
function omitUndefinedAndEmptyLists(obj) {
  return Object.keys(obj).reduce((o, property) => {
    if (o[property] === undefined || Array.isArray(o[property]) && o[property].length === 0) {
      delete o[property];
    }
    return o;
  }, obj);
}
function fixRepeatedFields(obj) {
  return Object.keys(obj).reduce((o, property) => {
    if (property.endsWith('List')) {
      o[property.replace(/List$/, '')] = o[property].map(fixRepeatedFields);
      delete o[property];
    }
    return o;
  }, obj);
}
function getEnumString(Enum, enumNumber, upperCase = false) {
  // `0` element is `undefined` by convention.
  if (!enumNumber || enumNumber === 0) return undefined;
  const enumString = Object.keys(Enum).find(key => Enum[key] === enumNumber);
  if (!enumString) throw new Error(`Unknown enum number: ${enumNumber}`);
  const camelized = camel(enumString.split('_').slice(1).join('_'));
  return upperCase ? upper(camelized) : camelized;
}
function getEnumNumber(Enum, enumString) {
  if (enumString === undefined) return undefined;
  const prefix = Object.keys(Enum)[0].split('_')[0];
  const field = [prefix, upper(snake(enumString), '_')].join('_');
  const val = Enum[field];
  if (val === undefined) throw new Error(`Unknown enum value: ${enumString} (${field})`);
  return val;
}
function serialize(ProtoClass, obj, converter) {
  if (obj === undefined) return undefined;
  const convertedObj = converter ? converter(obj) : obj;
  return fromByteArray(fromObject(ProtoClass, convertedObj).serializeBinary());
}
function deserialize(ProtoClass, base64String, converter) {
  const obj = fixRepeatedFields(ProtoClass.deserializeBinary(toByteArray(base64String)).toObject());
  return converter ? converter(obj) : obj;
}
var protobuf = {
  fromObject,
  omitUndefinedAndEmptyLists,
  fixRepeatedFields,
  getEnumString,
  getEnumNumber,
  serialize,
  deserialize
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var query_pb = createCommonjsModule(function (module, exports) {
  // source: query.proto
  /**
   * @fileoverview
   * @enhanceable
   * @suppress {missingRequire} reports error on implicit type usages.
   * @suppress {messageConventions} JS Compiler reports an error if a variable or
   *     field starts with 'MSG_' and isn't a translatable message.
   * @public
   */
  // GENERATED CODE -- DO NOT EDIT!
  /* eslint-disable */
  // @ts-nocheck

  var goog = googleProtobuf;
  var global = typeof globalThis !== 'undefined' && globalThis || typeof window !== 'undefined' && window || typeof global !== 'undefined' && global || typeof self !== 'undefined' && self || function () {
    return this;
  }.call(null) || Function('return this')();
  goog.exportSymbol('proto.impresso.query.CollectionRecommender', null, global);
  goog.exportSymbol('proto.impresso.query.CollectionRecommender.RecommenderType', null, global);
  goog.exportSymbol('proto.impresso.query.CollectionRecommenderParameter', null, global);
  goog.exportSymbol('proto.impresso.query.CollectionRecommenderParameter.RecommenderParameterId', null, global);
  goog.exportSymbol('proto.impresso.query.CollectionRecommendersSettings', null, global);
  goog.exportSymbol('proto.impresso.query.DateRange', null, global);
  goog.exportSymbol('proto.impresso.query.Filter', null, global);
  goog.exportSymbol('proto.impresso.query.FilterContext', null, global);
  goog.exportSymbol('proto.impresso.query.FilterOperator', null, global);
  goog.exportSymbol('proto.impresso.query.FilterPrecision', null, global);
  goog.exportSymbol('proto.impresso.query.FilterType', null, global);
  goog.exportSymbol('proto.impresso.query.GroupValue', null, global);
  goog.exportSymbol('proto.impresso.query.SearchQuery', null, global);
  /**
   * Generated by JsPbCodeGenerator.
   * @param {Array=} opt_data Optional initial data array, typically from a
   * server response, or constructed directly in Javascript. The array is used
   * in place and becomes part of the constructed object. It is not cloned.
   * If no data is provided, the constructed object will be empty, but still
   * valid.
   * @extends {jspb.Message}
   * @constructor
   */
  proto.impresso.query.DateRange = function (opt_data) {
    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
  };
  goog.inherits(proto.impresso.query.DateRange, googleProtobuf.Message);
  if (goog.DEBUG && !COMPILED) {
    /**
     * @public
     * @override
     */
    proto.impresso.query.DateRange.displayName = 'proto.impresso.query.DateRange';
  }
  /**
   * Generated by JsPbCodeGenerator.
   * @param {Array=} opt_data Optional initial data array, typically from a
   * server response, or constructed directly in Javascript. The array is used
   * in place and becomes part of the constructed object. It is not cloned.
   * If no data is provided, the constructed object will be empty, but still
   * valid.
   * @extends {jspb.Message}
   * @constructor
   */
  proto.impresso.query.Filter = function (opt_data) {
    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.impresso.query.Filter.repeatedFields_, null);
  };
  goog.inherits(proto.impresso.query.Filter, googleProtobuf.Message);
  if (goog.DEBUG && !COMPILED) {
    /**
     * @public
     * @override
     */
    proto.impresso.query.Filter.displayName = 'proto.impresso.query.Filter';
  }
  /**
   * Generated by JsPbCodeGenerator.
   * @param {Array=} opt_data Optional initial data array, typically from a
   * server response, or constructed directly in Javascript. The array is used
   * in place and becomes part of the constructed object. It is not cloned.
   * If no data is provided, the constructed object will be empty, but still
   * valid.
   * @extends {jspb.Message}
   * @constructor
   */
  proto.impresso.query.SearchQuery = function (opt_data) {
    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.impresso.query.SearchQuery.repeatedFields_, null);
  };
  goog.inherits(proto.impresso.query.SearchQuery, googleProtobuf.Message);
  if (goog.DEBUG && !COMPILED) {
    /**
     * @public
     * @override
     */
    proto.impresso.query.SearchQuery.displayName = 'proto.impresso.query.SearchQuery';
  }
  /**
   * Generated by JsPbCodeGenerator.
   * @param {Array=} opt_data Optional initial data array, typically from a
   * server response, or constructed directly in Javascript. The array is used
   * in place and becomes part of the constructed object. It is not cloned.
   * If no data is provided, the constructed object will be empty, but still
   * valid.
   * @extends {jspb.Message}
   * @constructor
   */
  proto.impresso.query.CollectionRecommenderParameter = function (opt_data) {
    googleProtobuf.Message.initialize(this, opt_data, 0, -1, null, null);
  };
  goog.inherits(proto.impresso.query.CollectionRecommenderParameter, googleProtobuf.Message);
  if (goog.DEBUG && !COMPILED) {
    /**
     * @public
     * @override
     */
    proto.impresso.query.CollectionRecommenderParameter.displayName = 'proto.impresso.query.CollectionRecommenderParameter';
  }
  /**
   * Generated by JsPbCodeGenerator.
   * @param {Array=} opt_data Optional initial data array, typically from a
   * server response, or constructed directly in Javascript. The array is used
   * in place and becomes part of the constructed object. It is not cloned.
   * If no data is provided, the constructed object will be empty, but still
   * valid.
   * @extends {jspb.Message}
   * @constructor
   */
  proto.impresso.query.CollectionRecommender = function (opt_data) {
    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.impresso.query.CollectionRecommender.repeatedFields_, null);
  };
  goog.inherits(proto.impresso.query.CollectionRecommender, googleProtobuf.Message);
  if (goog.DEBUG && !COMPILED) {
    /**
     * @public
     * @override
     */
    proto.impresso.query.CollectionRecommender.displayName = 'proto.impresso.query.CollectionRecommender';
  }
  /**
   * Generated by JsPbCodeGenerator.
   * @param {Array=} opt_data Optional initial data array, typically from a
   * server response, or constructed directly in Javascript. The array is used
   * in place and becomes part of the constructed object. It is not cloned.
   * If no data is provided, the constructed object will be empty, but still
   * valid.
   * @extends {jspb.Message}
   * @constructor
   */
  proto.impresso.query.CollectionRecommendersSettings = function (opt_data) {
    googleProtobuf.Message.initialize(this, opt_data, 0, -1, proto.impresso.query.CollectionRecommendersSettings.repeatedFields_, null);
  };
  goog.inherits(proto.impresso.query.CollectionRecommendersSettings, googleProtobuf.Message);
  if (goog.DEBUG && !COMPILED) {
    /**
     * @public
     * @override
     */
    proto.impresso.query.CollectionRecommendersSettings.displayName = 'proto.impresso.query.CollectionRecommendersSettings';
  }
  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * Optional fields that are not set will be set to undefined.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
     * @param {boolean=} opt_includeInstance Deprecated. whether to include the
     *     JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.impresso.query.DateRange.prototype.toObject = function (opt_includeInstance) {
      return proto.impresso.query.DateRange.toObject(opt_includeInstance, this);
    };

    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Deprecated. Whether to include
     *     the JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.impresso.query.DateRange} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.impresso.query.DateRange.toObject = function (includeInstance, msg) {
      var obj = {
          from: googleProtobuf.Message.getFieldWithDefault(msg, 1, 0),
          to: googleProtobuf.Message.getFieldWithDefault(msg, 2, 0)
        };
      if (includeInstance) {
        obj.$jspbMessageInstance = msg;
      }
      return obj;
    };
  }

  /**
   * Deserializes binary data (in protobuf wire format).
   * @param {jspb.ByteSource} bytes The bytes to deserialize.
   * @return {!proto.impresso.query.DateRange}
   */
  proto.impresso.query.DateRange.deserializeBinary = function (bytes) {
    var reader = new googleProtobuf.BinaryReader(bytes);
    var msg = new proto.impresso.query.DateRange();
    return proto.impresso.query.DateRange.deserializeBinaryFromReader(msg, reader);
  };

  /**
   * Deserializes binary data (in protobuf wire format) from the
   * given reader into the given message object.
   * @param {!proto.impresso.query.DateRange} msg The message object to deserialize into.
   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
   * @return {!proto.impresso.query.DateRange}
   */
  proto.impresso.query.DateRange.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) {
        break;
      }
      var field = reader.getFieldNumber();
      switch (field) {
        case 1:
          var value = /** @type {number} */reader.readSint64();
          msg.setFrom(value);
          break;
        case 2:
          var value = /** @type {number} */reader.readSint64();
          msg.setTo(value);
          break;
        default:
          reader.skipField();
          break;
      }
    }
    return msg;
  };

  /**
   * Serializes the message to binary data (in protobuf wire format).
   * @return {!Uint8Array}
   */
  proto.impresso.query.DateRange.prototype.serializeBinary = function () {
    var writer = new googleProtobuf.BinaryWriter();
    proto.impresso.query.DateRange.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  };

  /**
   * Serializes the given message to binary data (in protobuf wire
   * format), writing to the given BinaryWriter.
   * @param {!proto.impresso.query.DateRange} message
   * @param {!jspb.BinaryWriter} writer
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.impresso.query.DateRange.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getFrom();
    if (f !== 0) {
      writer.writeSint64(1, f);
    }
    f = message.getTo();
    if (f !== 0) {
      writer.writeSint64(2, f);
    }
  };

  /**
   * optional sint64 from = 1;
   * @return {number}
   */
  proto.impresso.query.DateRange.prototype.getFrom = function () {
    return /** @type {number} */googleProtobuf.Message.getFieldWithDefault(this, 1, 0);
  };

  /**
   * @param {number} value
   * @return {!proto.impresso.query.DateRange} returns this
   */
  proto.impresso.query.DateRange.prototype.setFrom = function (value) {
    return googleProtobuf.Message.setProto3IntField(this, 1, value);
  };

  /**
   * optional sint64 to = 2;
   * @return {number}
   */
  proto.impresso.query.DateRange.prototype.getTo = function () {
    return /** @type {number} */googleProtobuf.Message.getFieldWithDefault(this, 2, 0);
  };

  /**
   * @param {number} value
   * @return {!proto.impresso.query.DateRange} returns this
   */
  proto.impresso.query.DateRange.prototype.setTo = function (value) {
    return googleProtobuf.Message.setProto3IntField(this, 2, value);
  };

  /**
   * List of repeated fields within this message type.
   * @private {!Array<number>}
   * @const
   */
  proto.impresso.query.Filter.repeatedFields_ = [5, 7];
  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * Optional fields that are not set will be set to undefined.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
     * @param {boolean=} opt_includeInstance Deprecated. whether to include the
     *     JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.impresso.query.Filter.prototype.toObject = function (opt_includeInstance) {
      return proto.impresso.query.Filter.toObject(opt_includeInstance, this);
    };

    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Deprecated. Whether to include
     *     the JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.impresso.query.Filter} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.impresso.query.Filter.toObject = function (includeInstance, msg) {
      var f,
        obj = {
          context: googleProtobuf.Message.getFieldWithDefault(msg, 1, 0),
          op: googleProtobuf.Message.getFieldWithDefault(msg, 2, 0),
          type: googleProtobuf.Message.getFieldWithDefault(msg, 3, 0),
          precision: googleProtobuf.Message.getFieldWithDefault(msg, 4, 0),
          qList: (f = googleProtobuf.Message.getRepeatedField(msg, 5)) == null ? undefined : f,
          daterange: (f = msg.getDaterange()) && proto.impresso.query.DateRange.toObject(includeInstance, f),
          uidsList: (f = googleProtobuf.Message.getRepeatedField(msg, 7)) == null ? undefined : f
        };
      if (includeInstance) {
        obj.$jspbMessageInstance = msg;
      }
      return obj;
    };
  }

  /**
   * Deserializes binary data (in protobuf wire format).
   * @param {jspb.ByteSource} bytes The bytes to deserialize.
   * @return {!proto.impresso.query.Filter}
   */
  proto.impresso.query.Filter.deserializeBinary = function (bytes) {
    var reader = new googleProtobuf.BinaryReader(bytes);
    var msg = new proto.impresso.query.Filter();
    return proto.impresso.query.Filter.deserializeBinaryFromReader(msg, reader);
  };

  /**
   * Deserializes binary data (in protobuf wire format) from the
   * given reader into the given message object.
   * @param {!proto.impresso.query.Filter} msg The message object to deserialize into.
   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
   * @return {!proto.impresso.query.Filter}
   */
  proto.impresso.query.Filter.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) {
        break;
      }
      var field = reader.getFieldNumber();
      switch (field) {
        case 1:
          var value = /** @type {!proto.impresso.query.FilterContext} */reader.readEnum();
          msg.setContext(value);
          break;
        case 2:
          var value = /** @type {!proto.impresso.query.FilterOperator} */reader.readEnum();
          msg.setOp(value);
          break;
        case 3:
          var value = /** @type {!proto.impresso.query.FilterType} */reader.readEnum();
          msg.setType(value);
          break;
        case 4:
          var value = /** @type {!proto.impresso.query.FilterPrecision} */reader.readEnum();
          msg.setPrecision(value);
          break;
        case 5:
          var value = /** @type {string} */reader.readString();
          msg.addQ(value);
          break;
        case 6:
          var value = new proto.impresso.query.DateRange();
          reader.readMessage(value, proto.impresso.query.DateRange.deserializeBinaryFromReader);
          msg.setDaterange(value);
          break;
        case 7:
          var value = /** @type {string} */reader.readString();
          msg.addUids(value);
          break;
        default:
          reader.skipField();
          break;
      }
    }
    return msg;
  };

  /**
   * Serializes the message to binary data (in protobuf wire format).
   * @return {!Uint8Array}
   */
  proto.impresso.query.Filter.prototype.serializeBinary = function () {
    var writer = new googleProtobuf.BinaryWriter();
    proto.impresso.query.Filter.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  };

  /**
   * Serializes the given message to binary data (in protobuf wire
   * format), writing to the given BinaryWriter.
   * @param {!proto.impresso.query.Filter} message
   * @param {!jspb.BinaryWriter} writer
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.impresso.query.Filter.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getContext();
    if (f !== 0.0) {
      writer.writeEnum(1, f);
    }
    f = message.getOp();
    if (f !== 0.0) {
      writer.writeEnum(2, f);
    }
    f = message.getType();
    if (f !== 0.0) {
      writer.writeEnum(3, f);
    }
    f = message.getPrecision();
    if (f !== 0.0) {
      writer.writeEnum(4, f);
    }
    f = message.getQList();
    if (f.length > 0) {
      writer.writeRepeatedString(5, f);
    }
    f = message.getDaterange();
    if (f != null) {
      writer.writeMessage(6, f, proto.impresso.query.DateRange.serializeBinaryToWriter);
    }
    f = message.getUidsList();
    if (f.length > 0) {
      writer.writeRepeatedString(7, f);
    }
  };

  /**
   * optional FilterContext context = 1;
   * @return {!proto.impresso.query.FilterContext}
   */
  proto.impresso.query.Filter.prototype.getContext = function () {
    return /** @type {!proto.impresso.query.FilterContext} */googleProtobuf.Message.getFieldWithDefault(this, 1, 0);
  };

  /**
   * @param {!proto.impresso.query.FilterContext} value
   * @return {!proto.impresso.query.Filter} returns this
   */
  proto.impresso.query.Filter.prototype.setContext = function (value) {
    return googleProtobuf.Message.setProto3EnumField(this, 1, value);
  };

  /**
   * optional FilterOperator op = 2;
   * @return {!proto.impresso.query.FilterOperator}
   */
  proto.impresso.query.Filter.prototype.getOp = function () {
    return /** @type {!proto.impresso.query.FilterOperator} */googleProtobuf.Message.getFieldWithDefault(this, 2, 0);
  };

  /**
   * @param {!proto.impresso.query.FilterOperator} value
   * @return {!proto.impresso.query.Filter} returns this
   */
  proto.impresso.query.Filter.prototype.setOp = function (value) {
    return googleProtobuf.Message.setProto3EnumField(this, 2, value);
  };

  /**
   * optional FilterType type = 3;
   * @return {!proto.impresso.query.FilterType}
   */
  proto.impresso.query.Filter.prototype.getType = function () {
    return /** @type {!proto.impresso.query.FilterType} */googleProtobuf.Message.getFieldWithDefault(this, 3, 0);
  };

  /**
   * @param {!proto.impresso.query.FilterType} value
   * @return {!proto.impresso.query.Filter} returns this
   */
  proto.impresso.query.Filter.prototype.setType = function (value) {
    return googleProtobuf.Message.setProto3EnumField(this, 3, value);
  };

  /**
   * optional FilterPrecision precision = 4;
   * @return {!proto.impresso.query.FilterPrecision}
   */
  proto.impresso.query.Filter.prototype.getPrecision = function () {
    return /** @type {!proto.impresso.query.FilterPrecision} */googleProtobuf.Message.getFieldWithDefault(this, 4, 0);
  };

  /**
   * @param {!proto.impresso.query.FilterPrecision} value
   * @return {!proto.impresso.query.Filter} returns this
   */
  proto.impresso.query.Filter.prototype.setPrecision = function (value) {
    return googleProtobuf.Message.setProto3EnumField(this, 4, value);
  };

  /**
   * repeated string q = 5;
   * @return {!Array<string>}
   */
  proto.impresso.query.Filter.prototype.getQList = function () {
    return /** @type {!Array<string>} */googleProtobuf.Message.getRepeatedField(this, 5);
  };

  /**
   * @param {!Array<string>} value
   * @return {!proto.impresso.query.Filter} returns this
   */
  proto.impresso.query.Filter.prototype.setQList = function (value) {
    return googleProtobuf.Message.setField(this, 5, value || []);
  };

  /**
   * @param {string} value
   * @param {number=} opt_index
   * @return {!proto.impresso.query.Filter} returns this
   */
  proto.impresso.query.Filter.prototype.addQ = function (value, opt_index) {
    return googleProtobuf.Message.addToRepeatedField(this, 5, value, opt_index);
  };

  /**
   * Clears the list making it empty but non-null.
   * @return {!proto.impresso.query.Filter} returns this
   */
  proto.impresso.query.Filter.prototype.clearQList = function () {
    return this.setQList([]);
  };

  /**
   * optional DateRange daterange = 6;
   * @return {?proto.impresso.query.DateRange}
   */
  proto.impresso.query.Filter.prototype.getDaterange = function () {
    return /** @type{?proto.impresso.query.DateRange} */(
      googleProtobuf.Message.getWrapperField(this, proto.impresso.query.DateRange, 6)
    );
  };

  /**
   * @param {?proto.impresso.query.DateRange|undefined} value
   * @return {!proto.impresso.query.Filter} returns this
  */
  proto.impresso.query.Filter.prototype.setDaterange = function (value) {
    return googleProtobuf.Message.setWrapperField(this, 6, value);
  };

  /**
   * Clears the message field making it undefined.
   * @return {!proto.impresso.query.Filter} returns this
   */
  proto.impresso.query.Filter.prototype.clearDaterange = function () {
    return this.setDaterange(undefined);
  };

  /**
   * Returns whether this field is set.
   * @return {boolean}
   */
  proto.impresso.query.Filter.prototype.hasDaterange = function () {
    return googleProtobuf.Message.getField(this, 6) != null;
  };

  /**
   * repeated string uids = 7;
   * @return {!Array<string>}
   */
  proto.impresso.query.Filter.prototype.getUidsList = function () {
    return /** @type {!Array<string>} */googleProtobuf.Message.getRepeatedField(this, 7);
  };

  /**
   * @param {!Array<string>} value
   * @return {!proto.impresso.query.Filter} returns this
   */
  proto.impresso.query.Filter.prototype.setUidsList = function (value) {
    return googleProtobuf.Message.setField(this, 7, value || []);
  };

  /**
   * @param {string} value
   * @param {number=} opt_index
   * @return {!proto.impresso.query.Filter} returns this
   */
  proto.impresso.query.Filter.prototype.addUids = function (value, opt_index) {
    return googleProtobuf.Message.addToRepeatedField(this, 7, value, opt_index);
  };

  /**
   * Clears the list making it empty but non-null.
   * @return {!proto.impresso.query.Filter} returns this
   */
  proto.impresso.query.Filter.prototype.clearUidsList = function () {
    return this.setUidsList([]);
  };

  /**
   * List of repeated fields within this message type.
   * @private {!Array<number>}
   * @const
   */
  proto.impresso.query.SearchQuery.repeatedFields_ = [1];
  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * Optional fields that are not set will be set to undefined.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
     * @param {boolean=} opt_includeInstance Deprecated. whether to include the
     *     JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.impresso.query.SearchQuery.prototype.toObject = function (opt_includeInstance) {
      return proto.impresso.query.SearchQuery.toObject(opt_includeInstance, this);
    };

    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Deprecated. Whether to include
     *     the JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.impresso.query.SearchQuery} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.impresso.query.SearchQuery.toObject = function (includeInstance, msg) {
      var obj = {
          filtersList: googleProtobuf.Message.toObjectList(msg.getFiltersList(), proto.impresso.query.Filter.toObject, includeInstance),
          groupBy: googleProtobuf.Message.getFieldWithDefault(msg, 2, 0)
        };
      if (includeInstance) {
        obj.$jspbMessageInstance = msg;
      }
      return obj;
    };
  }

  /**
   * Deserializes binary data (in protobuf wire format).
   * @param {jspb.ByteSource} bytes The bytes to deserialize.
   * @return {!proto.impresso.query.SearchQuery}
   */
  proto.impresso.query.SearchQuery.deserializeBinary = function (bytes) {
    var reader = new googleProtobuf.BinaryReader(bytes);
    var msg = new proto.impresso.query.SearchQuery();
    return proto.impresso.query.SearchQuery.deserializeBinaryFromReader(msg, reader);
  };

  /**
   * Deserializes binary data (in protobuf wire format) from the
   * given reader into the given message object.
   * @param {!proto.impresso.query.SearchQuery} msg The message object to deserialize into.
   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
   * @return {!proto.impresso.query.SearchQuery}
   */
  proto.impresso.query.SearchQuery.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) {
        break;
      }
      var field = reader.getFieldNumber();
      switch (field) {
        case 1:
          var value = new proto.impresso.query.Filter();
          reader.readMessage(value, proto.impresso.query.Filter.deserializeBinaryFromReader);
          msg.addFilters(value);
          break;
        case 2:
          var value = /** @type {!proto.impresso.query.GroupValue} */reader.readEnum();
          msg.setGroupBy(value);
          break;
        default:
          reader.skipField();
          break;
      }
    }
    return msg;
  };

  /**
   * Serializes the message to binary data (in protobuf wire format).
   * @return {!Uint8Array}
   */
  proto.impresso.query.SearchQuery.prototype.serializeBinary = function () {
    var writer = new googleProtobuf.BinaryWriter();
    proto.impresso.query.SearchQuery.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  };

  /**
   * Serializes the given message to binary data (in protobuf wire
   * format), writing to the given BinaryWriter.
   * @param {!proto.impresso.query.SearchQuery} message
   * @param {!jspb.BinaryWriter} writer
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.impresso.query.SearchQuery.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getFiltersList();
    if (f.length > 0) {
      writer.writeRepeatedMessage(1, f, proto.impresso.query.Filter.serializeBinaryToWriter);
    }
    f = message.getGroupBy();
    if (f !== 0.0) {
      writer.writeEnum(2, f);
    }
  };

  /**
   * repeated Filter filters = 1;
   * @return {!Array<!proto.impresso.query.Filter>}
   */
  proto.impresso.query.SearchQuery.prototype.getFiltersList = function () {
    return /** @type{!Array<!proto.impresso.query.Filter>} */(
      googleProtobuf.Message.getRepeatedWrapperField(this, proto.impresso.query.Filter, 1)
    );
  };

  /**
   * @param {!Array<!proto.impresso.query.Filter>} value
   * @return {!proto.impresso.query.SearchQuery} returns this
  */
  proto.impresso.query.SearchQuery.prototype.setFiltersList = function (value) {
    return googleProtobuf.Message.setRepeatedWrapperField(this, 1, value);
  };

  /**
   * @param {!proto.impresso.query.Filter=} opt_value
   * @param {number=} opt_index
   * @return {!proto.impresso.query.Filter}
   */
  proto.impresso.query.SearchQuery.prototype.addFilters = function (opt_value, opt_index) {
    return googleProtobuf.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.impresso.query.Filter, opt_index);
  };

  /**
   * Clears the list making it empty but non-null.
   * @return {!proto.impresso.query.SearchQuery} returns this
   */
  proto.impresso.query.SearchQuery.prototype.clearFiltersList = function () {
    return this.setFiltersList([]);
  };

  /**
   * optional GroupValue group_by = 2;
   * @return {!proto.impresso.query.GroupValue}
   */
  proto.impresso.query.SearchQuery.prototype.getGroupBy = function () {
    return /** @type {!proto.impresso.query.GroupValue} */googleProtobuf.Message.getFieldWithDefault(this, 2, 0);
  };

  /**
   * @param {!proto.impresso.query.GroupValue} value
   * @return {!proto.impresso.query.SearchQuery} returns this
   */
  proto.impresso.query.SearchQuery.prototype.setGroupBy = function (value) {
    return googleProtobuf.Message.setProto3EnumField(this, 2, value);
  };
  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * Optional fields that are not set will be set to undefined.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
     * @param {boolean=} opt_includeInstance Deprecated. whether to include the
     *     JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.impresso.query.CollectionRecommenderParameter.prototype.toObject = function (opt_includeInstance) {
      return proto.impresso.query.CollectionRecommenderParameter.toObject(opt_includeInstance, this);
    };

    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Deprecated. Whether to include
     *     the JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.impresso.query.CollectionRecommenderParameter} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.impresso.query.CollectionRecommenderParameter.toObject = function (includeInstance, msg) {
      var obj = {
          key: googleProtobuf.Message.getFieldWithDefault(msg, 1, 0),
          stringValue: googleProtobuf.Message.getFieldWithDefault(msg, 2, ""),
          numberValue: googleProtobuf.Message.getFieldWithDefault(msg, 3, 0),
          boolValue: googleProtobuf.Message.getBooleanFieldWithDefault(msg, 4, false)
        };
      if (includeInstance) {
        obj.$jspbMessageInstance = msg;
      }
      return obj;
    };
  }

  /**
   * Deserializes binary data (in protobuf wire format).
   * @param {jspb.ByteSource} bytes The bytes to deserialize.
   * @return {!proto.impresso.query.CollectionRecommenderParameter}
   */
  proto.impresso.query.CollectionRecommenderParameter.deserializeBinary = function (bytes) {
    var reader = new googleProtobuf.BinaryReader(bytes);
    var msg = new proto.impresso.query.CollectionRecommenderParameter();
    return proto.impresso.query.CollectionRecommenderParameter.deserializeBinaryFromReader(msg, reader);
  };

  /**
   * Deserializes binary data (in protobuf wire format) from the
   * given reader into the given message object.
   * @param {!proto.impresso.query.CollectionRecommenderParameter} msg The message object to deserialize into.
   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
   * @return {!proto.impresso.query.CollectionRecommenderParameter}
   */
  proto.impresso.query.CollectionRecommenderParameter.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) {
        break;
      }
      var field = reader.getFieldNumber();
      switch (field) {
        case 1:
          var value = /** @type {!proto.impresso.query.CollectionRecommenderParameter.RecommenderParameterId} */reader.readEnum();
          msg.setKey(value);
          break;
        case 2:
          var value = /** @type {string} */reader.readString();
          msg.setStringValue(value);
          break;
        case 3:
          var value = /** @type {number} */reader.readSint32();
          msg.setNumberValue(value);
          break;
        case 4:
          var value = /** @type {boolean} */reader.readBool();
          msg.setBoolValue(value);
          break;
        default:
          reader.skipField();
          break;
      }
    }
    return msg;
  };

  /**
   * Serializes the message to binary data (in protobuf wire format).
   * @return {!Uint8Array}
   */
  proto.impresso.query.CollectionRecommenderParameter.prototype.serializeBinary = function () {
    var writer = new googleProtobuf.BinaryWriter();
    proto.impresso.query.CollectionRecommenderParameter.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  };

  /**
   * Serializes the given message to binary data (in protobuf wire
   * format), writing to the given BinaryWriter.
   * @param {!proto.impresso.query.CollectionRecommenderParameter} message
   * @param {!jspb.BinaryWriter} writer
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.impresso.query.CollectionRecommenderParameter.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getKey();
    if (f !== 0.0) {
      writer.writeEnum(1, f);
    }
    f = message.getStringValue();
    if (f.length > 0) {
      writer.writeString(2, f);
    }
    f = message.getNumberValue();
    if (f !== 0) {
      writer.writeSint32(3, f);
    }
    f = message.getBoolValue();
    if (f) {
      writer.writeBool(4, f);
    }
  };

  /**
   * @enum {number}
   */
  proto.impresso.query.CollectionRecommenderParameter.RecommenderParameterId = {
    ID_UNSPECIFIED: 0,
    ID_COUNT_TYPE: 1,
    ID_MIN_OCCURRENCES: 2,
    ID_NUMBER_TO_KEEP: 3,
    ID_REMOVE_FULLY_MENTIONED: 4,
    ID_NORMALIZE_MAX_SCORE: 5,
    ID_MARGIN: 6,
    ID_SCALING_FACTOR: 7
  };

  /**
   * optional RecommenderParameterId key = 1;
   * @return {!proto.impresso.query.CollectionRecommenderParameter.RecommenderParameterId}
   */
  proto.impresso.query.CollectionRecommenderParameter.prototype.getKey = function () {
    return /** @type {!proto.impresso.query.CollectionRecommenderParameter.RecommenderParameterId} */googleProtobuf.Message.getFieldWithDefault(this, 1, 0);
  };

  /**
   * @param {!proto.impresso.query.CollectionRecommenderParameter.RecommenderParameterId} value
   * @return {!proto.impresso.query.CollectionRecommenderParameter} returns this
   */
  proto.impresso.query.CollectionRecommenderParameter.prototype.setKey = function (value) {
    return googleProtobuf.Message.setProto3EnumField(this, 1, value);
  };

  /**
   * optional string string_value = 2;
   * @return {string}
   */
  proto.impresso.query.CollectionRecommenderParameter.prototype.getStringValue = function () {
    return /** @type {string} */googleProtobuf.Message.getFieldWithDefault(this, 2, "");
  };

  /**
   * @param {string} value
   * @return {!proto.impresso.query.CollectionRecommenderParameter} returns this
   */
  proto.impresso.query.CollectionRecommenderParameter.prototype.setStringValue = function (value) {
    return googleProtobuf.Message.setProto3StringField(this, 2, value);
  };

  /**
   * optional sint32 number_value = 3;
   * @return {number}
   */
  proto.impresso.query.CollectionRecommenderParameter.prototype.getNumberValue = function () {
    return /** @type {number} */googleProtobuf.Message.getFieldWithDefault(this, 3, 0);
  };

  /**
   * @param {number} value
   * @return {!proto.impresso.query.CollectionRecommenderParameter} returns this
   */
  proto.impresso.query.CollectionRecommenderParameter.prototype.setNumberValue = function (value) {
    return googleProtobuf.Message.setProto3IntField(this, 3, value);
  };

  /**
   * optional bool bool_value = 4;
   * @return {boolean}
   */
  proto.impresso.query.CollectionRecommenderParameter.prototype.getBoolValue = function () {
    return /** @type {boolean} */googleProtobuf.Message.getBooleanFieldWithDefault(this, 4, false);
  };

  /**
   * @param {boolean} value
   * @return {!proto.impresso.query.CollectionRecommenderParameter} returns this
   */
  proto.impresso.query.CollectionRecommenderParameter.prototype.setBoolValue = function (value) {
    return googleProtobuf.Message.setProto3BooleanField(this, 4, value);
  };

  /**
   * List of repeated fields within this message type.
   * @private {!Array<number>}
   * @const
   */
  proto.impresso.query.CollectionRecommender.repeatedFields_ = [3];
  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * Optional fields that are not set will be set to undefined.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
     * @param {boolean=} opt_includeInstance Deprecated. whether to include the
     *     JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.impresso.query.CollectionRecommender.prototype.toObject = function (opt_includeInstance) {
      return proto.impresso.query.CollectionRecommender.toObject(opt_includeInstance, this);
    };

    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Deprecated. Whether to include
     *     the JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.impresso.query.CollectionRecommender} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.impresso.query.CollectionRecommender.toObject = function (includeInstance, msg) {
      var obj = {
          type: googleProtobuf.Message.getFieldWithDefault(msg, 1, 0),
          weight: googleProtobuf.Message.getFieldWithDefault(msg, 2, 0),
          parametersList: googleProtobuf.Message.toObjectList(msg.getParametersList(), proto.impresso.query.CollectionRecommenderParameter.toObject, includeInstance),
          enabled: googleProtobuf.Message.getBooleanFieldWithDefault(msg, 4, false)
        };
      if (includeInstance) {
        obj.$jspbMessageInstance = msg;
      }
      return obj;
    };
  }

  /**
   * Deserializes binary data (in protobuf wire format).
   * @param {jspb.ByteSource} bytes The bytes to deserialize.
   * @return {!proto.impresso.query.CollectionRecommender}
   */
  proto.impresso.query.CollectionRecommender.deserializeBinary = function (bytes) {
    var reader = new googleProtobuf.BinaryReader(bytes);
    var msg = new proto.impresso.query.CollectionRecommender();
    return proto.impresso.query.CollectionRecommender.deserializeBinaryFromReader(msg, reader);
  };

  /**
   * Deserializes binary data (in protobuf wire format) from the
   * given reader into the given message object.
   * @param {!proto.impresso.query.CollectionRecommender} msg The message object to deserialize into.
   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
   * @return {!proto.impresso.query.CollectionRecommender}
   */
  proto.impresso.query.CollectionRecommender.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) {
        break;
      }
      var field = reader.getFieldNumber();
      switch (field) {
        case 1:
          var value = /** @type {!proto.impresso.query.CollectionRecommender.RecommenderType} */reader.readEnum();
          msg.setType(value);
          break;
        case 2:
          var value = /** @type {number} */reader.readSint32();
          msg.setWeight(value);
          break;
        case 3:
          var value = new proto.impresso.query.CollectionRecommenderParameter();
          reader.readMessage(value, proto.impresso.query.CollectionRecommenderParameter.deserializeBinaryFromReader);
          msg.addParameters(value);
          break;
        case 4:
          var value = /** @type {boolean} */reader.readBool();
          msg.setEnabled(value);
          break;
        default:
          reader.skipField();
          break;
      }
    }
    return msg;
  };

  /**
   * Serializes the message to binary data (in protobuf wire format).
   * @return {!Uint8Array}
   */
  proto.impresso.query.CollectionRecommender.prototype.serializeBinary = function () {
    var writer = new googleProtobuf.BinaryWriter();
    proto.impresso.query.CollectionRecommender.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  };

  /**
   * Serializes the given message to binary data (in protobuf wire
   * format), writing to the given BinaryWriter.
   * @param {!proto.impresso.query.CollectionRecommender} message
   * @param {!jspb.BinaryWriter} writer
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.impresso.query.CollectionRecommender.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getType();
    if (f !== 0.0) {
      writer.writeEnum(1, f);
    }
    f = message.getWeight();
    if (f !== 0) {
      writer.writeSint32(2, f);
    }
    f = message.getParametersList();
    if (f.length > 0) {
      writer.writeRepeatedMessage(3, f, proto.impresso.query.CollectionRecommenderParameter.serializeBinaryToWriter);
    }
    f = message.getEnabled();
    if (f) {
      writer.writeBool(4, f);
    }
  };

  /**
   * @enum {number}
   */
  proto.impresso.query.CollectionRecommender.RecommenderType = {
    TYPE_UNSPECIFIED: 0,
    TYPE_TIME_RANGE: 1,
    TYPE_ENTITIES: 2,
    TYPE_TOPICS: 3,
    TYPE_TEXT_REUSE_CLUSTERS: 4
  };

  /**
   * optional RecommenderType type = 1;
   * @return {!proto.impresso.query.CollectionRecommender.RecommenderType}
   */
  proto.impresso.query.CollectionRecommender.prototype.getType = function () {
    return /** @type {!proto.impresso.query.CollectionRecommender.RecommenderType} */googleProtobuf.Message.getFieldWithDefault(this, 1, 0);
  };

  /**
   * @param {!proto.impresso.query.CollectionRecommender.RecommenderType} value
   * @return {!proto.impresso.query.CollectionRecommender} returns this
   */
  proto.impresso.query.CollectionRecommender.prototype.setType = function (value) {
    return googleProtobuf.Message.setProto3EnumField(this, 1, value);
  };

  /**
   * optional sint32 weight = 2;
   * @return {number}
   */
  proto.impresso.query.CollectionRecommender.prototype.getWeight = function () {
    return /** @type {number} */googleProtobuf.Message.getFieldWithDefault(this, 2, 0);
  };

  /**
   * @param {number} value
   * @return {!proto.impresso.query.CollectionRecommender} returns this
   */
  proto.impresso.query.CollectionRecommender.prototype.setWeight = function (value) {
    return googleProtobuf.Message.setProto3IntField(this, 2, value);
  };

  /**
   * repeated CollectionRecommenderParameter parameters = 3;
   * @return {!Array<!proto.impresso.query.CollectionRecommenderParameter>}
   */
  proto.impresso.query.CollectionRecommender.prototype.getParametersList = function () {
    return /** @type{!Array<!proto.impresso.query.CollectionRecommenderParameter>} */(
      googleProtobuf.Message.getRepeatedWrapperField(this, proto.impresso.query.CollectionRecommenderParameter, 3)
    );
  };

  /**
   * @param {!Array<!proto.impresso.query.CollectionRecommenderParameter>} value
   * @return {!proto.impresso.query.CollectionRecommender} returns this
  */
  proto.impresso.query.CollectionRecommender.prototype.setParametersList = function (value) {
    return googleProtobuf.Message.setRepeatedWrapperField(this, 3, value);
  };

  /**
   * @param {!proto.impresso.query.CollectionRecommenderParameter=} opt_value
   * @param {number=} opt_index
   * @return {!proto.impresso.query.CollectionRecommenderParameter}
   */
  proto.impresso.query.CollectionRecommender.prototype.addParameters = function (opt_value, opt_index) {
    return googleProtobuf.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.impresso.query.CollectionRecommenderParameter, opt_index);
  };

  /**
   * Clears the list making it empty but non-null.
   * @return {!proto.impresso.query.CollectionRecommender} returns this
   */
  proto.impresso.query.CollectionRecommender.prototype.clearParametersList = function () {
    return this.setParametersList([]);
  };

  /**
   * optional bool enabled = 4;
   * @return {boolean}
   */
  proto.impresso.query.CollectionRecommender.prototype.getEnabled = function () {
    return /** @type {boolean} */googleProtobuf.Message.getBooleanFieldWithDefault(this, 4, false);
  };

  /**
   * @param {boolean} value
   * @return {!proto.impresso.query.CollectionRecommender} returns this
   */
  proto.impresso.query.CollectionRecommender.prototype.setEnabled = function (value) {
    return googleProtobuf.Message.setProto3BooleanField(this, 4, value);
  };

  /**
   * List of repeated fields within this message type.
   * @private {!Array<number>}
   * @const
   */
  proto.impresso.query.CollectionRecommendersSettings.repeatedFields_ = [1];
  if (googleProtobuf.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * Optional fields that are not set will be set to undefined.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
     * @param {boolean=} opt_includeInstance Deprecated. whether to include the
     *     JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.impresso.query.CollectionRecommendersSettings.prototype.toObject = function (opt_includeInstance) {
      return proto.impresso.query.CollectionRecommendersSettings.toObject(opt_includeInstance, this);
    };

    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Deprecated. Whether to include
     *     the JSPB instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.impresso.query.CollectionRecommendersSettings} msg The msg instance to transform.
     * @return {!Object}
     * @suppress {unusedLocalVariables} f is only used for nested messages
     */
    proto.impresso.query.CollectionRecommendersSettings.toObject = function (includeInstance, msg) {
      var obj = {
          recommendersList: googleProtobuf.Message.toObjectList(msg.getRecommendersList(), proto.impresso.query.CollectionRecommender.toObject, includeInstance)
        };
      if (includeInstance) {
        obj.$jspbMessageInstance = msg;
      }
      return obj;
    };
  }

  /**
   * Deserializes binary data (in protobuf wire format).
   * @param {jspb.ByteSource} bytes The bytes to deserialize.
   * @return {!proto.impresso.query.CollectionRecommendersSettings}
   */
  proto.impresso.query.CollectionRecommendersSettings.deserializeBinary = function (bytes) {
    var reader = new googleProtobuf.BinaryReader(bytes);
    var msg = new proto.impresso.query.CollectionRecommendersSettings();
    return proto.impresso.query.CollectionRecommendersSettings.deserializeBinaryFromReader(msg, reader);
  };

  /**
   * Deserializes binary data (in protobuf wire format) from the
   * given reader into the given message object.
   * @param {!proto.impresso.query.CollectionRecommendersSettings} msg The message object to deserialize into.
   * @param {!jspb.BinaryReader} reader The BinaryReader to use.
   * @return {!proto.impresso.query.CollectionRecommendersSettings}
   */
  proto.impresso.query.CollectionRecommendersSettings.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
      if (reader.isEndGroup()) {
        break;
      }
      var field = reader.getFieldNumber();
      switch (field) {
        case 1:
          var value = new proto.impresso.query.CollectionRecommender();
          reader.readMessage(value, proto.impresso.query.CollectionRecommender.deserializeBinaryFromReader);
          msg.addRecommenders(value);
          break;
        default:
          reader.skipField();
          break;
      }
    }
    return msg;
  };

  /**
   * Serializes the message to binary data (in protobuf wire format).
   * @return {!Uint8Array}
   */
  proto.impresso.query.CollectionRecommendersSettings.prototype.serializeBinary = function () {
    var writer = new googleProtobuf.BinaryWriter();
    proto.impresso.query.CollectionRecommendersSettings.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
  };

  /**
   * Serializes the given message to binary data (in protobuf wire
   * format), writing to the given BinaryWriter.
   * @param {!proto.impresso.query.CollectionRecommendersSettings} message
   * @param {!jspb.BinaryWriter} writer
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.impresso.query.CollectionRecommendersSettings.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getRecommendersList();
    if (f.length > 0) {
      writer.writeRepeatedMessage(1, f, proto.impresso.query.CollectionRecommender.serializeBinaryToWriter);
    }
  };

  /**
   * repeated CollectionRecommender recommenders = 1;
   * @return {!Array<!proto.impresso.query.CollectionRecommender>}
   */
  proto.impresso.query.CollectionRecommendersSettings.prototype.getRecommendersList = function () {
    return /** @type{!Array<!proto.impresso.query.CollectionRecommender>} */(
      googleProtobuf.Message.getRepeatedWrapperField(this, proto.impresso.query.CollectionRecommender, 1)
    );
  };

  /**
   * @param {!Array<!proto.impresso.query.CollectionRecommender>} value
   * @return {!proto.impresso.query.CollectionRecommendersSettings} returns this
  */
  proto.impresso.query.CollectionRecommendersSettings.prototype.setRecommendersList = function (value) {
    return googleProtobuf.Message.setRepeatedWrapperField(this, 1, value);
  };

  /**
   * @param {!proto.impresso.query.CollectionRecommender=} opt_value
   * @param {number=} opt_index
   * @return {!proto.impresso.query.CollectionRecommender}
   */
  proto.impresso.query.CollectionRecommendersSettings.prototype.addRecommenders = function (opt_value, opt_index) {
    return googleProtobuf.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.impresso.query.CollectionRecommender, opt_index);
  };

  /**
   * Clears the list making it empty but non-null.
   * @return {!proto.impresso.query.CollectionRecommendersSettings} returns this
   */
  proto.impresso.query.CollectionRecommendersSettings.prototype.clearRecommendersList = function () {
    return this.setRecommendersList([]);
  };

  /**
   * @enum {number}
   */
  proto.impresso.query.FilterContext = {
    CONTEXT_UNSPECIFIED: 0,
    CONTEXT_INCLUDE: 1,
    CONTEXT_EXCLUDE: 2
  };

  /**
   * @enum {number}
   */
  proto.impresso.query.FilterOperator = {
    OPERATOR_UNSPECIFIED: 0,
    OPERATOR_AND: 1,
    OPERATOR_OR: 2
  };

  /**
   * @enum {number}
   */
  proto.impresso.query.FilterType = {
    TYPE_UNSPECIFIED: 0,
    TYPE_UID: 1,
    TYPE_HAS_TEXT_CONTENTS: 2,
    TYPE_TITLE: 3,
    TYPE_IS_FRONT: 4,
    TYPE_PAGE: 5,
    TYPE_ISSUE: 6,
    TYPE_STRING: 7,
    TYPE_ENTITY: 8,
    TYPE_NEWSPAPER: 9,
    TYPE_DATERANGE: 10,
    TYPE_YEAR: 11,
    TYPE_LANGUAGE: 12,
    TYPE_TYPE: 13,
    TYPE_REGEX: 14,
    TYPE_MENTION: 15,
    TYPE_PERSON: 16,
    TYPE_LOCATION: 17,
    TYPE_TOPIC: 18,
    TYPE_COLLECTION: 19,
    TYPE_OCR_QUALITY: 20,
    TYPE_CONTENT_LENGTH: 21,
    TYPE_COUNTRY: 22,
    TYPE_ACCESS_RIGHT: 23,
    TYPE_PARTNER: 24,
    TYPE_MONTH: 25,
    TYPE_TEXT_REUSE_CLUSTER_SIZE: 26,
    TYPE_TEXT_REUSE_CLUSTER_LEXICAL_OVERLAP: 27,
    TYPE_TEXT_REUSE_CLUSTER_DAY_DELTA: 28,
    TYPE_TEXT_REUSE_CLUSTER: 29,
    TYPE_MENTION_FUNCTION: 30,
    TYPE_NAG: 31,
    TYPE_WIKIDATA_ID: 32
  };

  /**
   * @enum {number}
   */
  proto.impresso.query.FilterPrecision = {
    PRECISION_UNSPECIFIED: 0,
    PRECISION_EXACT: 1,
    PRECISION_PARTIAL: 2,
    PRECISION_FUZZY: 3,
    PRECISION_SOFT: 4
  };

  /**
   * @enum {number}
   */
  proto.impresso.query.GroupValue = {
    GROUPVALUE_UNSPECIFIED: 0,
    GROUPVALUE_ARTICLES: 1
  };
  goog.object.extend(exports, proto.impresso.query);
});

const {
  fromObject: fromObject$1,
  omitUndefinedAndEmptyLists: omitUndefinedAndEmptyLists$1,
  getEnumString: getEnumString$1,
  getEnumNumber: getEnumNumber$1,
  serialize: serialize$1,
  deserialize: deserialize$1
} = protobuf;
const {
  Filter,
  FilterContext,
  FilterOperator,
  FilterType,
  FilterPrecision,
  DateRange,
  SearchQuery,
  GroupValue,
  CollectionRecommendersSettings,
  CollectionRecommender,
  CollectionRecommenderParameter
} = query_pb;
function stringAsArray(s) {
  if (typeof s === 'string' || s instanceof String) return [s];
  return s;
}
function maybeArrayAsString(a) {
  if (a !== undefined && a.length === 1) return a[0];
  return a;
}
function daterangeSerializeConverter(daterange) {
  if (daterange === undefined) return undefined;
  return {
    from: Date.parse(daterange.from),
    to: Date.parse(daterange.to)
  };
}
function daterangeDeserializeConverter(daterange) {
  if (daterange === undefined) return undefined;
  return {
    from: new Date(daterange.from).toISOString(),
    to: new Date(daterange.to).toISOString()
  };
}

/**
 * Convert from JS `Filter` Object to Protobuf `Filter` Message.
 * Used before serializing.
 * @param {object} filter
 */
function filterSerializerConverter(filter) {
  return _objectSpread2(_objectSpread2({}, filter), {}, {
    q: stringAsArray(filter.q),
    context: getEnumNumber$1(FilterContext, filter.context),
    op: getEnumNumber$1(FilterOperator, filter.op),
    type: getEnumNumber$1(FilterType, filter.type),
    precision: getEnumNumber$1(FilterPrecision, filter.precision),
    daterange: fromObject$1(DateRange, daterangeSerializeConverter(filter.daterange))
  });
}

/**
 * Convert from Protobuf `Filter` Message to JS `Filter` Object and remove default enums.
 * Used after serializing.
 * @param {object} filter
 */
function filterDeserializerConverter(filter) {
  return omitUndefinedAndEmptyLists$1(_objectSpread2(_objectSpread2({}, filter), {}, {
    q: maybeArrayAsString(filter.q),
    context: getEnumString$1(FilterContext, filter.context),
    op: getEnumString$1(FilterOperator, filter.op, true),
    type: getEnumString$1(FilterType, filter.type),
    precision: getEnumString$1(FilterPrecision, filter.precision),
    daterange: daterangeDeserializeConverter(filter.daterange)
  }));
}
function searchQuerySerializerConverter(searchQuery) {
  return _objectSpread2(_objectSpread2({}, searchQuery), {}, {
    filters: (searchQuery.filters || []).map(f => fromObject$1(Filter, filterSerializerConverter(f))),
    groupBy: getEnumNumber$1(GroupValue, searchQuery.groupBy)
  });
}
function searchQueryDeserializerConverter(searchQuery) {
  return omitUndefinedAndEmptyLists$1(_objectSpread2(_objectSpread2({}, searchQuery), {}, {
    filters: (searchQuery.filters || []).map(filterDeserializerConverter),
    groupBy: getEnumString$1(GroupValue, searchQuery.groupBy)
  }));
}

/**
 * @param {number} number
 * @param {digits} digits
 * @returns {number|undefined}
 */
function toFixedPointNumber(number, digits = 2) {
  if (number == null) return undefined;
  return parseFloat(number.toFixed(digits)) * 10 ** digits;
}
function fromFixedPointNumber(number, digits = 2) {
  if (number == null) return undefined;
  return number / 10 ** digits;
}
function collectionRecommenderParameterSerializerConverter(obj) {
  let stringValue;
  let numberValue;
  let boolValue;
  if (typeof obj.value === 'number') numberValue = toFixedPointNumber(obj.value);
  if (typeof obj.value === 'string') stringValue = obj.value;
  if (typeof obj.value === 'boolean') boolValue = obj.value;
  return {
    key: getEnumNumber$1(CollectionRecommenderParameter.RecommenderParameterId, obj.key),
    stringValue,
    numberValue,
    boolValue
  };
}
function collectionRecommenderSerializerConverter(obj) {
  return omitUndefinedAndEmptyLists$1(_objectSpread2(_objectSpread2({}, obj), {}, {
    type: getEnumNumber$1(CollectionRecommender.RecommenderType, obj.type),
    weight: toFixedPointNumber(obj.weight),
    parameters: (obj.parameters || []).map(f => fromObject$1(CollectionRecommenderParameter, collectionRecommenderParameterSerializerConverter(f)))
  }));
}
function collectionRecommendersSettingsSerializerConverter(obj) {
  return omitUndefinedAndEmptyLists$1(_objectSpread2(_objectSpread2({}, obj), {}, {
    recommenders: (obj.recommenders || []).map(f => fromObject$1(CollectionRecommender, collectionRecommenderSerializerConverter(f)))
  }));
}
function collectionRecommenderParameterDeserializerConverter(parameter) {
  let value;
  if (parameter.boolValue != null) value = parameter.boolValue;
  if (parameter.numberValue !== 0) value = fromFixedPointNumber(parameter.numberValue);
  if (parameter.stringValue !== '') value = parameter.stringValue;
  return omitUndefinedAndEmptyLists$1({
    key: getEnumString$1(CollectionRecommenderParameter.RecommenderParameterId, parameter.key, false),
    value
  });
}
function collectionRecommenderDeserializerConverter(recommender) {
  return omitUndefinedAndEmptyLists$1(_objectSpread2(_objectSpread2({}, recommender), {}, {
    type: getEnumString$1(CollectionRecommender.RecommenderType, recommender.type, false),
    weight: fromFixedPointNumber(recommender.weight) || 0,
    parameters: (recommender.parameters || []).map(collectionRecommenderParameterDeserializerConverter),
    enabled: recommender.enabled || undefined
  }));
}
function collectionRecommendersSettingsDeserializerConverter(settings) {
  return omitUndefinedAndEmptyLists$1({
    recommenders: (settings.recommenders || []).map(collectionRecommenderDeserializerConverter)
  });
}
var protobuf$1 = {
  filter: {
    serialize: obj => serialize$1(Filter, obj, filterSerializerConverter),
    deserialize: base64String => deserialize$1(Filter, base64String, filterDeserializerConverter)
  },
  searchQuery: {
    serialize: obj => serialize$1(SearchQuery, obj, searchQuerySerializerConverter),
    deserialize: base64String => deserialize$1(SearchQuery, base64String, searchQueryDeserializerConverter)
  },
  collectionRecommendersSettings: {
    serialize: obj => serialize$1(CollectionRecommendersSettings, obj, collectionRecommendersSettingsSerializerConverter),
    deserialize: base64String => deserialize$1(CollectionRecommendersSettings, base64String, collectionRecommendersSettingsDeserializerConverter)
  }
};

const {
  camel: camel$1
} = _case;
const {
  FilterType: FilterType$1,
  FilterOperator: FilterOperator$1,
  FilterContext: FilterContext$1,
  FilterPrecision: FilterPrecision$1
} = query_pb;
const Types = Object.freeze(Object.keys(FilterType$1).filter(filterType => FilterType$1[filterType] !== FilterType$1.TYPE_UNSPECIFIED).map(filterType => camel$1(filterType.split('_').slice(1).join('_'))));
const Operators = Object.freeze(Object.keys(FilterOperator$1).filter(operator => FilterOperator$1[operator] !== FilterOperator$1.OPERATOR_UNSPECIFIED).map(operator => camel$1(operator.split('_').slice(1).join('_')).toUpperCase()));
const Contexts = Object.freeze(Object.keys(FilterContext$1).filter(context => FilterContext$1[context] !== FilterContext$1.CONTEXT_UNSPECIFIED).map(context => camel$1(context.split('_').slice(1).join('_')).toLowerCase()));
const Precision = Object.freeze(Object.keys(FilterPrecision$1).filter(precision => FilterPrecision$1[precision] !== FilterPrecision$1.PRECISION_UNSPECIFIED).map(precision => camel$1(precision.split('_').slice(1).join('_')).toLowerCase()));
var constants = {
  filter: {
    Types,
    Operators,
    Contexts,
    Precision
  }
};

// @ts-check

/**
 * @typedef {import('..').Filter} Filter
 */

/**
 * @param {Filter} p
 * @returns {string}
 */
const getFilterMergeKey = ({
  type,
  op = 'OR',
  context = 'inclusive',
  precision = 'exact'
}) => `t:${type}-o:${op}-c:${context}-p:${precision}`;

/**
 * @param {object} object
 * @param {function} fn
 * @returns {object}
 */
const omitBy = (object, fn) => Object.keys(object).reduce((acc, key) => {
  const value = object[key];
  if (!fn(value)) acc[key] = value;
  return acc;
}, {});

/**
 * Optimize filters by merging filters of the same type with the same
 * context/precision where possible.
 * @param {Filter[]} filters
 * @returns {Filter[]}
 */
function optimizeFilters(filters) {
  const groupingMap = filters.reduce((map, filter) => {
    const key = getFilterMergeKey(filter);
    const items = map.get(key) || [];
    map.set(key, items.concat([filter]));
    return map;
  }, new Map());
  return [...groupingMap.entries()].map(([, groupedFilters]) => {
    const {
      type,
      context,
      precision,
      op
    } = groupedFilters[0];
    const query = groupedFilters.flatMap(({
      q
    }) => Array.isArray(q) ? q : [q]).filter(value => value != null);
    return omitBy({
      type,
      context,
      precision,
      op,
      q: query.length > 1 ? query : query[0]
    }, value => value == null);
  });
}

/**
 * Merge filters with a rule that all single item (`q`) filters operator
 * is set to `AND`. Then the standard merge is applied.
 * @param {Filter[][]} filtersSets
 * @returns {Filter[]}
 */
function mergeFilters(filtersSets) {
  return optimizeFilters(filtersSets.flat().map(filter => {
    const op = Array.isArray(filter.q) && filter.q.length === 1 || !Array.isArray(filter.q) ? 'AND' : filter.op;
    return _objectSpread2(_objectSpread2({}, filter), {}, {
      op
    });
  }));
}
var filter = {
  optimizeFilters,
  mergeFilters
};

var logic = {
  filter
};

var src = {
  protobuf: protobuf$1,
  constants,
  logic
};
var src_1 = src.protobuf;
var src_2 = src.constants;
var src_3 = src.logic;

exports.constants = src_2;
exports.default = src;
exports.logic = src_3;
exports.protobuf = src_1;

Object.defineProperty(exports, '__esModule', { value: true });

})));
