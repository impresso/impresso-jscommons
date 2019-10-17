/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

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
proto.impresso.query.DateRange = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.impresso.query.DateRange, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.impresso.query.DateRange.displayName = 'proto.impresso.query.DateRange';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.impresso.query.DateRange.prototype.toObject = function(opt_includeInstance) {
  return proto.impresso.query.DateRange.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.impresso.query.DateRange} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.impresso.query.DateRange.toObject = function(includeInstance, msg) {
  var f, obj = {
    from: jspb.Message.getFieldWithDefault(msg, 1, 0),
    to: jspb.Message.getFieldWithDefault(msg, 2, 0)
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
proto.impresso.query.DateRange.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.impresso.query.DateRange;
  return proto.impresso.query.DateRange.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.impresso.query.DateRange} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.impresso.query.DateRange}
 */
proto.impresso.query.DateRange.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFrom(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
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
proto.impresso.query.DateRange.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
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
proto.impresso.query.DateRange.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFrom();
  if (f !== 0) {
    writer.writeInt64(
      1,
      f
    );
  }
  f = message.getTo();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
};


/**
 * optional int64 from = 1;
 * @return {number}
 */
proto.impresso.query.DateRange.prototype.getFrom = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.impresso.query.DateRange.prototype.setFrom = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int64 to = 2;
 * @return {number}
 */
proto.impresso.query.DateRange.prototype.getTo = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.impresso.query.DateRange.prototype.setTo = function(value) {
  jspb.Message.setProto3IntField(this, 2, value);
};



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
proto.impresso.query.Filter = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.impresso.query.Filter.repeatedFields_, null);
};
goog.inherits(proto.impresso.query.Filter, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.impresso.query.Filter.displayName = 'proto.impresso.query.Filter';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.impresso.query.Filter.repeatedFields_ = [5,7];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.impresso.query.Filter.prototype.toObject = function(opt_includeInstance) {
  return proto.impresso.query.Filter.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.impresso.query.Filter} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.impresso.query.Filter.toObject = function(includeInstance, msg) {
  var f, obj = {
    context: jspb.Message.getFieldWithDefault(msg, 1, 0),
    operator: jspb.Message.getFieldWithDefault(msg, 2, 0),
    type: jspb.Message.getFieldWithDefault(msg, 3, 0),
    precision: jspb.Message.getFieldWithDefault(msg, 4, 0),
    queryList: jspb.Message.getRepeatedField(msg, 5),
    daterange: (f = msg.getDaterange()) && proto.impresso.query.DateRange.toObject(includeInstance, f),
    uidsList: jspb.Message.getRepeatedField(msg, 7)
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
proto.impresso.query.Filter.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.impresso.query.Filter;
  return proto.impresso.query.Filter.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.impresso.query.Filter} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.impresso.query.Filter}
 */
proto.impresso.query.Filter.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.impresso.query.FilterContext} */ (reader.readEnum());
      msg.setContext(value);
      break;
    case 2:
      var value = /** @type {!proto.impresso.query.FilterOperator} */ (reader.readEnum());
      msg.setOperator(value);
      break;
    case 3:
      var value = /** @type {!proto.impresso.query.FilterType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 4:
      var value = /** @type {!proto.impresso.query.FilterPrecision} */ (reader.readEnum());
      msg.setPrecision(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.addQuery(value);
      break;
    case 6:
      var value = new proto.impresso.query.DateRange;
      reader.readMessage(value,proto.impresso.query.DateRange.deserializeBinaryFromReader);
      msg.setDaterange(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
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
proto.impresso.query.Filter.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
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
proto.impresso.query.Filter.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContext();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getOperator();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      3,
      f
    );
  }
  f = message.getPrecision();
  if (f !== 0.0) {
    writer.writeEnum(
      4,
      f
    );
  }
  f = message.getQueryList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      5,
      f
    );
  }
  f = message.getDaterange();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.impresso.query.DateRange.serializeBinaryToWriter
    );
  }
  f = message.getUidsList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      7,
      f
    );
  }
};


/**
 * optional FilterContext context = 1;
 * @return {!proto.impresso.query.FilterContext}
 */
proto.impresso.query.Filter.prototype.getContext = function() {
  return /** @type {!proto.impresso.query.FilterContext} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {!proto.impresso.query.FilterContext} value */
proto.impresso.query.Filter.prototype.setContext = function(value) {
  jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional FilterOperator operator = 2;
 * @return {!proto.impresso.query.FilterOperator}
 */
proto.impresso.query.Filter.prototype.getOperator = function() {
  return /** @type {!proto.impresso.query.FilterOperator} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {!proto.impresso.query.FilterOperator} value */
proto.impresso.query.Filter.prototype.setOperator = function(value) {
  jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * optional FilterType type = 3;
 * @return {!proto.impresso.query.FilterType}
 */
proto.impresso.query.Filter.prototype.getType = function() {
  return /** @type {!proto.impresso.query.FilterType} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {!proto.impresso.query.FilterType} value */
proto.impresso.query.Filter.prototype.setType = function(value) {
  jspb.Message.setProto3EnumField(this, 3, value);
};


/**
 * optional FilterPrecision precision = 4;
 * @return {!proto.impresso.query.FilterPrecision}
 */
proto.impresso.query.Filter.prototype.getPrecision = function() {
  return /** @type {!proto.impresso.query.FilterPrecision} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/** @param {!proto.impresso.query.FilterPrecision} value */
proto.impresso.query.Filter.prototype.setPrecision = function(value) {
  jspb.Message.setProto3EnumField(this, 4, value);
};


/**
 * repeated string query = 5;
 * @return {!Array<string>}
 */
proto.impresso.query.Filter.prototype.getQueryList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 5));
};


/** @param {!Array<string>} value */
proto.impresso.query.Filter.prototype.setQueryList = function(value) {
  jspb.Message.setField(this, 5, value || []);
};


/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.impresso.query.Filter.prototype.addQuery = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 5, value, opt_index);
};


proto.impresso.query.Filter.prototype.clearQueryList = function() {
  this.setQueryList([]);
};


/**
 * optional DateRange daterange = 6;
 * @return {?proto.impresso.query.DateRange}
 */
proto.impresso.query.Filter.prototype.getDaterange = function() {
  return /** @type{?proto.impresso.query.DateRange} */ (
    jspb.Message.getWrapperField(this, proto.impresso.query.DateRange, 6));
};


/** @param {?proto.impresso.query.DateRange|undefined} value */
proto.impresso.query.Filter.prototype.setDaterange = function(value) {
  jspb.Message.setWrapperField(this, 6, value);
};


proto.impresso.query.Filter.prototype.clearDaterange = function() {
  this.setDaterange(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.impresso.query.Filter.prototype.hasDaterange = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * repeated string uids = 7;
 * @return {!Array<string>}
 */
proto.impresso.query.Filter.prototype.getUidsList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 7));
};


/** @param {!Array<string>} value */
proto.impresso.query.Filter.prototype.setUidsList = function(value) {
  jspb.Message.setField(this, 7, value || []);
};


/**
 * @param {!string} value
 * @param {number=} opt_index
 */
proto.impresso.query.Filter.prototype.addUids = function(value, opt_index) {
  jspb.Message.addToRepeatedField(this, 7, value, opt_index);
};


proto.impresso.query.Filter.prototype.clearUidsList = function() {
  this.setUidsList([]);
};



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
proto.impresso.query.SearchQuery = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.impresso.query.SearchQuery.repeatedFields_, null);
};
goog.inherits(proto.impresso.query.SearchQuery, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.impresso.query.SearchQuery.displayName = 'proto.impresso.query.SearchQuery';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.impresso.query.SearchQuery.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.impresso.query.SearchQuery.prototype.toObject = function(opt_includeInstance) {
  return proto.impresso.query.SearchQuery.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.impresso.query.SearchQuery} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.impresso.query.SearchQuery.toObject = function(includeInstance, msg) {
  var f, obj = {
    filtersList: jspb.Message.toObjectList(msg.getFiltersList(),
    proto.impresso.query.Filter.toObject, includeInstance),
    groupBy: jspb.Message.getFieldWithDefault(msg, 2, 0)
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
proto.impresso.query.SearchQuery.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.impresso.query.SearchQuery;
  return proto.impresso.query.SearchQuery.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.impresso.query.SearchQuery} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.impresso.query.SearchQuery}
 */
proto.impresso.query.SearchQuery.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.impresso.query.Filter;
      reader.readMessage(value,proto.impresso.query.Filter.deserializeBinaryFromReader);
      msg.addFilters(value);
      break;
    case 2:
      var value = /** @type {!proto.impresso.query.GroupValue} */ (reader.readEnum());
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
proto.impresso.query.SearchQuery.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
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
proto.impresso.query.SearchQuery.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFiltersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.impresso.query.Filter.serializeBinaryToWriter
    );
  }
  f = message.getGroupBy();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * repeated Filter filters = 1;
 * @return {!Array<!proto.impresso.query.Filter>}
 */
proto.impresso.query.SearchQuery.prototype.getFiltersList = function() {
  return /** @type{!Array<!proto.impresso.query.Filter>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.impresso.query.Filter, 1));
};


/** @param {!Array<!proto.impresso.query.Filter>} value */
proto.impresso.query.SearchQuery.prototype.setFiltersList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.impresso.query.Filter=} opt_value
 * @param {number=} opt_index
 * @return {!proto.impresso.query.Filter}
 */
proto.impresso.query.SearchQuery.prototype.addFilters = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.impresso.query.Filter, opt_index);
};


proto.impresso.query.SearchQuery.prototype.clearFiltersList = function() {
  this.setFiltersList([]);
};


/**
 * optional GroupValue group_by = 2;
 * @return {!proto.impresso.query.GroupValue}
 */
proto.impresso.query.SearchQuery.prototype.getGroupBy = function() {
  return /** @type {!proto.impresso.query.GroupValue} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {!proto.impresso.query.GroupValue} value */
proto.impresso.query.SearchQuery.prototype.setGroupBy = function(value) {
  jspb.Message.setProto3EnumField(this, 2, value);
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
  TYPE_COUNTRY: 22
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
